
import { Page, Locator } from '@playwright/test';

export class EmployeeClaimsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // ===== Locators =====

    get employeeNameInput(): Locator {
        return this.page.locator('input[placeholder="Type for hints..."]').first();
    }

    get referenceIdInput(): Locator {
        return this.page.locator('input[placeholder="Type for hints..."]').nth(1);
    }

    get eventNameDropdown(): Locator {
        return this.page.locator('.oxd-select-text-input').first();
    }

    get statusDropdown(): Locator {
        return this.page.locator('.oxd-select-text-input').nth(1);
    }

    get includeDropdown(): Locator {
        return this.page.locator('.oxd-select-text-input').nth(2);
    }

    get fromDateInput(): Locator {
        return this.page.locator('input[placeholder="yyyy-dd-mm"]').first();
    }

    get toDateInput(): Locator {
        return this.page.locator('input[placeholder="yyyy-dd-mm"]').nth(1);
    }

    get searchButton(): Locator {
        return this.page.locator('button[type="submit"]');
    }

    get resetButton(): Locator {
        return this.page.locator('button.oxd-button--ghost');
    }

    get resultsTable(): Locator {
        return this.page.locator('.oxd-table');
    }


    async search(employeeName?: string, referenceId?: string) {
        if (employeeName) {
            await this.employeeNameInput.fill(employeeName);
        }

        if (referenceId) {
            await this.referenceIdInput.fill(referenceId);
        }

        await this.searchButton.click();
    }

    async reset() {
        await this.resetButton.click();
    }
}