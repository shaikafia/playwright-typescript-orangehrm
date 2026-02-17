import { Locator, Page } from '@playwright/test';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Selectors
    get usernameInput(): Locator {
        return this.page.locator('input[name="username"]');
    }

    get passwordInput(): Locator {
        return this.page.locator('input[name="password"]');
    }

    get loginButton(): Locator {
        return this.page.locator('button[type="submit"]');
    }

    get errorMessage(): Locator {
        return this.page.locator('.orangehrm-login-error'); // Adjust based on actual error message element
    }

    // Actions
    async navigateToLogin() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    async enterUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async getErrorMessageText() {
        return await this.errorMessage.innerText();
    }

    async isLoginButtonEnabled(): Promise<boolean> {
        return await this.loginButton.isEnabled();
    }

    async getCurrentUrl() {
        return this.page.url();
    }
}
