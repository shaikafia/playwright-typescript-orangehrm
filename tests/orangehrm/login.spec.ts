import { test, expect } from '@playwright/test';
import { LoginPage } from './loginPage';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
    });

    test('Verify that a user can successfully log in with valid credentials', async () => {
        await loginPage.enterUsername('Admin');
        await loginPage.enterPassword('admin123');
        await loginPage.clickLoginButton();
        expect(await loginPage.getCurrentUrl()).toContain('/dashboard'); // Adjust based on actual landing page URL
    });

    test('Ensure that the login button is enabled when valid credentials are entered', async () => {
        await loginPage.enterUsername('Admin');
        await loginPage.enterPassword('admin123');
        expect(await loginPage.isLoginButtonEnabled()).toBe(true);
    });

    test('Test the login functionality with an incorrect username and/or password', async () => {
        await loginPage.enterUsername('InvalidUser');
        await loginPage.enterPassword('InvalidPass');
        await loginPage.clickLoginButton();
        expect(await loginPage.getErrorMessageText()).toContain('Invalid credentials'); // Adjust based on actual error message
    });

    test('Attempt to submit the login form with empty username and password fields', async () => {
        await loginPage.clickLoginButton();
        await expect(loginPage.errorMessage).toHaveText('Username : AdminPassword : admin123'); // Adjust based on actual error message
    });

    test('Simulate a user attempting to log in using a password manager', async () => {
        await loginPage.enterUsername('Admin');
        await loginPage.enterPassword('admin123'); // Simulate autofill
        await loginPage.clickLoginButton();
        expect(await loginPage.getCurrentUrl()).toContain('/dashboard'); // Adjust based on actual landing page URL
    });

    test('Test the login form behavior when a user tries to paste credentials', async () => {
        await loginPage.usernameInput.fill('Admin');
        await loginPage.passwordInput.fill('admin123'); // Simulate pasting
        await loginPage.clickLoginButton();
        expect(await loginPage.getCurrentUrl()).toContain('/dashboard'); // Adjust based on actual landing page URL
    });

    test('Investigate if the login form retains the entered username after a failed login attempt', async () => {
        await loginPage.enterUsername('Admin');
        await loginPage.enterPassword('WrongPassword');
        await loginPage.clickLoginButton();
        expect(await loginPage.getErrorMessageText()).toContain('Invalid credentials');
        expect(await loginPage.usernameInput.inputValue()).toBe('');
    });
});