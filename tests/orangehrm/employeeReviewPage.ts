import { Locator, Page } from '@playwright/test';

export class EmployeeReviewPage {
    public page: Page;
    private employeeNameInput: Locator;
    public jobTitleDropdown: Locator;
    public subUnitDropdown: Locator;
    public reviewStatusDropdown: Locator;
    private fromDateInput: Locator;
    private toDateInput: Locator;
    private resetButton: Locator;
    private searchButton: Locator;
    private autocompleteSuggestions: Locator;

    constructor(page: Page) {
        this.page = page;
        this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]');
        this.jobTitleDropdown = page.locator('.oxd-select-wrapper').nth(1);
        this.subUnitDropdown = page.locator('.oxd-select-wrapper').nth(2);
        this.reviewStatusDropdown = page.locator('.oxd-select-wrapper').nth(3);
        this.fromDateInput = page.locator('input[placeholder="yyyy-dd-mm"]').nth(0);
        this.toDateInput = page.locator('input[placeholder="yyyy-dd-mm"]').nth(1);
        this.resetButton = page.locator('button[type="reset"]');
        this.searchButton = page.locator('button[type="submit"]');
        this.autocompleteSuggestions = page.locator('.oxd-autocomplete-option');
    }

    async fillEmployeeName(name: string) {
        await this.employeeNameInput.fill(name);
    }

    async selectFirstJobTitle() {
        await this.jobTitleDropdown.click();
        const options = this.page.locator('.oxd-select-dropdown .oxd-select-option');
        const count = await options.count();

        if (count > 1) {
            await options.nth(1).click();
        }
    
    }

    async selectFirstSubUnit() {
        await this.subUnitDropdown.click();
        const options = this.page.locator('.oxd-select-dropdown .oxd-select-option');
        const count = await options.count();

        if (count > 1) {
            await options.nth(1).click();
        }
    }

    async selectFirstReviewStatus() {
        await this.reviewStatusDropdown.click();
        const options = this.page.locator('.oxd-select-dropdown .oxd-select-option');
        const count = await options.count();

        if (count > 1) {
            await options.nth(1).click();
        }

    }

    async fillFromDate(date: string) {
        await this.fromDateInput.fill(date);
    }

    async fillToDate(date: string) {
        await this.toDateInput.fill(date);
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async clickResetButton() {
        await this.resetButton.click();
    }

    async getAutocompleteSuggestions() {
        await this.page.waitForSelector('.oxd-autocomplete-option');
        return await this.autocompleteSuggestions.allTextContents();
    }
    async getDropdownOptions() {
    return await this.page.locator('.oxd-select-dropdown .oxd-select-option')
        .allTextContents();
}
}