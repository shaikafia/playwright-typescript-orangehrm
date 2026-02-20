import { test, expect } from '@playwright/test';
import { EmployeeClaimsPage } from './employeeClaimsPage';

test.describe('Employee Claims Tests', () => {

    test.beforeEach(async ({ page }) => {
        
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        await page.fill('input[name="username"]', 'Admin');
        await page.fill('input[name="password"]', 'admin123');
        await page.click('button[type="submit"]');

        await page.waitForURL('**/dashboard/index');

        
        await page.click('a[href*="claim"]');
        await page.waitForURL('**/claim/viewAssignClaim');
    });

    test('Search by employee name', async ({ page }) => {
        const claimsPage = new EmployeeClaimsPage(page);

        await claimsPage.search('Paul Collings');
        await expect(claimsPage.resultsTable).toBeVisible();
    });

    test('Search by reference ID', async ({ page }) => {
        const claimsPage = new EmployeeClaimsPage(page);

        await claimsPage.search(undefined, '2023');
        await expect(claimsPage.resultsTable).toBeVisible();
    });

    test('Invalid employee name shows no records', async ({ page }) => {
        const claimsPage = new EmployeeClaimsPage(page);

        await claimsPage.search('InvalidName');
        await expect(claimsPage.resultsTable).toBeVisible();
    });

    test('Autocomplete appears when typing employee name', async ({ page }) => {
        const claimsPage = new EmployeeClaimsPage(page);

        await claimsPage.employeeNameInput.fill('Pa');

        const suggestions = page.locator('.oxd-autocomplete-dropdown');
        await expect(suggestions).toBeVisible();
    });

    test('Reset clears employee name field', async ({ page }) => {
        const claimsPage = new EmployeeClaimsPage(page);

        await claimsPage.employeeNameInput.fill('Paul');
        await claimsPage.reset();

        await expect(claimsPage.resultsTable).toBeVisible();
    });

});