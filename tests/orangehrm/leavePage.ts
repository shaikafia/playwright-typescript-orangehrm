import { Locator, Page } from '@playwright/test';

export class LeavePage {
    constructor(private page: Page) {}

    private get fromDateInput(): Locator {
        return this.page.getByPlaceholder('yyyy-dd-mm', { exact: true }).nth(0);
    }
    private get toDateInput(): Locator {
        return this.page.getByPlaceholder('yyyy-dd-mm', { exact: true }).nth(1);
    }

    private get leaveTypeSelect(): Locator {
        return this.page.locator('.oxd-select-text').nth(1);
    }

    private get employeeNameInput(): Locator {
        return this.page.locator('input[placeholder="Type for hints..."]');
    }

    private get searchButton(): Locator {
        return this.page.locator('.oxd-button--secondary');
    }

    private get resetButton(): Locator {
        return this.page.locator('.oxd-button--ghost');
    }

    private get errorMessages(): Locator {
        return this.page.locator('.oxd-text--p.orangehrm-form-hint');
    }

    async enterFromDate(date: string) {
        await this.fromDateInput.waitFor({ state: 'visible'});
        await this.fromDateInput.click();
        await this.fromDateInput.fill('');
        await this.fromDateInput.type(date, { delay: 100});
    }

    async enterToDate(date: string) {
        await this.toDateInput.waitFor({ state: 'visible'});
        await this.toDateInput.click();
        await this.toDateInput.fill('');
        await this.toDateInput.type(date, { delay: 100});
    }

    async selectLeaveType(type: string): Promise<void> {
        const leaveTypeGroup = this.page
        .locator('.oxd-input-group')
        .filter({ hasText: 'Leave Type' });
        await leaveTypeGroup.locator('.oxd-select-text').click();
        await this.page.getByRole('option', { name: type }).click();
    }

    async enterEmployeeName(name: string) {
        await this.employeeNameInput.fill(name);
    }

    async submitForm() {
        await this.searchButton.click();
    }

    async resetForm() {
        await this.resetButton.click();
    }

    async getErrorMessages() {
        return this.errorMessages.allTextContents();
    }
}
