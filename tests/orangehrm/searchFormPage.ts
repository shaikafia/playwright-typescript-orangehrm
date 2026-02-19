import { Page, Locator } from "@playwright/test";

export class SearchFormPage {
  constructor(private page: Page) {}

  private inputByLabel(label: string): Locator {
    return this.page
      .locator(".oxd-input-group")
      .filter({ hasText: label })
      .locator("input");
  }

  private dropdownByLabel(label: string): Locator {
    return this.page
      .locator(".oxd-input-group")
      .filter({ hasText: label })
      .locator(".oxd-select-text");
  }

  get employeeNameInput(): Locator {
    return this.inputByLabel("Employee Name");
  }

  get employeeIdInput(): Locator {
    return this.inputByLabel("Employee Id");
  }

  get employmentStatusDropdown(): Locator {
    return this.dropdownByLabel("Employment Status");
  }

  get includeDropdown(): Locator {
    return this.dropdownByLabel("Include");
  }

  get supervisorNameInput(): Locator {
    return this.inputByLabel("Supervisor Name");
  }

  get jobTitleDropdown(): Locator {
    return this.dropdownByLabel("Job Title");
  }

  get subUnitDropdown(): Locator {
    return this.dropdownByLabel("Sub Unit");
  }

  get searchButton(): Locator {
    return this.page.getByRole("button", { name: "Search" });
  }

  get resetButton(): Locator {
    return this.page.getByRole("button", { name: "Reset" });
  }
  get resultsTable(): Locator {
    return this.page.locator(".oxd-table");
  }


  async fillEmployeeName(name: string): Promise<void> {
    await this.employeeNameInput.fill(name);
  }

  async fillEmployeeId(id: string): Promise<void> {
    await this.employeeIdInput.fill(id);
  }

  async fillSupervisorName(name: string): Promise<void> {
    await this.supervisorNameInput.fill(name);
  }

  async selectEmploymentStatus(option: string): Promise<void> {
    await this.employmentStatusDropdown.click();
    await this.page
      .locator('.oxd-select-dropdown div[role="option"]', {
        hasText: option,
      })
      .click();
  }

  async submitForm(): Promise<void> {
    await this.searchButton.click();
  }

  async resetForm(): Promise<void> {
    await this.resetButton.click();
  }

  async isSearchButtonEnabled(): Promise<boolean> {
    return this.searchButton.isEnabled();
  }

  private get autocompleteDropdown(): Locator {
    return this.page.locator(".oxd-autocomplete-dropdown");
  }

  async isSupervisorAutocompleteVisible(): Promise<boolean> {
    return this.autocompleteDropdown.isVisible();
  }

  async getSupervisorSuggestionsCount(): Promise<number> {
    return this.autocompleteDropdown.locator('div[role="option"]').count();
  }
}
