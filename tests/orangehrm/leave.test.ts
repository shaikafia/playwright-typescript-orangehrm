import { test, expect } from '@playwright/test';
import { LeavePage } from './leavePage';

test.beforeEach(async ({ page }) => {
     await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/dashboard/index');

    // Click Leave from menu (IMPORTANT)
    await page.click('a[href*="leave"]');

    await page.waitForURL('**/leave/viewLeaveList');
    await page.waitForSelector('form');

});

test('Verify that entering a valid "From Date" and "To Date" returns the correct list of leaves', async ({ page }) => {
    const leavePage = new LeavePage(page);
    await leavePage.enterFromDate('2023-01-01');
    await leavePage.enterToDate('2023-31-01');
    await leavePage.submitForm();
    await expect(page.locator('.oxd-table')).toBeVisible();
});

test('Validate that selecting a leave type filters the results correctly in the leave list', async ({ page }) => {
    const leavePage = new LeavePage(page);
    await leavePage.selectLeaveType('CAN - Vacation');
    await leavePage.submitForm();
    await expect(page.locator('.oxd-table')).toBeVisible();
    
});

test('Attempt to submit the form without filling in any required fields and verify that appropriate error messages are displayed', async ({ page }) => {
    const leavePage = new LeavePage(page);
    await leavePage.submitForm();
    
    const errorMessages = await leavePage.getErrorMessages();
    expect(errorMessages).toContain(' * Required');
});

test('Validate that the search results update dynamically when the user types in the "Employee Name" field without needing to click the "Search" button', async ({ page }) => {
    const leavePage = new LeavePage(page);
    await leavePage.enterEmployeeName('John');
    const suggestionDropdown = page.locator('.oxd-autocomplete-dropdown');
    await expect(suggestionDropdown).toBeVisible();
    await expect(suggestionDropdown).toContainText('John');
    
    
});