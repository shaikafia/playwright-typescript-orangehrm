import { test, expect } from '@playwright/test';
import { EmployeeReviewPage } from './employeeReviewPage';

test.describe('Employee Reviews', () => {
    let employeeReviewPage: EmployeeReviewPage;

    test.beforeEach(async ({ page }) => {
        employeeReviewPage = new EmployeeReviewPage(page);
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await page.fill('input[name="username"]', 'Admin');
        await page.fill('input[name="password"]', 'admin123');
        await page.click('button[type="submit"]');
        await page.waitForURL('**/dashboard/index');
        await page.click('a[href*="performance"]');
        await page.waitForURL('**/performance/searchEvaluatePerformanceReview');
    });

    test('Verify that the form can be submitted successfully when all required fields are filled out correctly.', async () => {
        await employeeReviewPage.fillEmployeeName('John Doe');
        await employeeReviewPage.selectFirstJobTitle();
        await employeeReviewPage.selectFirstSubUnit();
        await employeeReviewPage.selectFirstReviewStatus();
        await employeeReviewPage.fillFromDate('2023-01-01');
        await employeeReviewPage.fillToDate('2023-12-31');
        await employeeReviewPage.clickSearchButton();
        // Add assertion here based on expected behavior after form submission
    });

    test('Check if the search results are displayed correctly when a valid employee name is entered.', async () => {
        await employeeReviewPage.fillEmployeeName('John Doe');
        await employeeReviewPage.clickSearchButton();
        // Add assertion to check if results are displayed
    });

    test('Validate that the dropdown menus for job title, subunit, and review status populate correctly with relevant options.', async () => {
        await employeeReviewPage.jobTitleDropdown.click();
        const jobTitleOptions = await employeeReviewPage.getDropdownOptions();
        expect(jobTitleOptions.length).toBeGreaterThanOrEqual(1); // Add more expected options as necessary

        await employeeReviewPage.subUnitDropdown.click();
        const subUnitOptions = await employeeReviewPage.getDropdownOptions();
        expect(subUnitOptions.length).toBeGreaterThan(1);// Add more expected options as necessary

        await employeeReviewPage.reviewStatusDropdown.click();
        const reviewStatusOptions = await employeeReviewPage.getDropdownOptions();
        expect(reviewStatusOptions.length).toBeGreaterThan(1); // Add more expected options as necessary
    });

    test('Attempt to submit the form without entering any data to check for appropriate error messages or validation prompts.', async () => {
        await employeeReviewPage.clickSearchButton();
        // Add assertion to check for validation messages
    });

    test('Input an invalid employee name and verify that no results are returned.', async () => {
        await employeeReviewPage.fillEmployeeName('Invalid Name');
        await employeeReviewPage.clickSearchButton();
        // Add assertion to check that no results are displayed
    });

    test('Test the autocomplete functionality by entering partial employee names and verify that the suggestions are relevant and accurate.', async () => {
        await employeeReviewPage.fillEmployeeName('a');
        const suggestions = await employeeReviewPage.getAutocompleteSuggestions();
        expect(suggestions.length).toBeGreaterThan(0); // Add more expected suggestions as necessary
    });
});