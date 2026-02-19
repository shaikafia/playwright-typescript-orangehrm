import { test, expect } from "@playwright/test";
import { SearchFormPage } from "./searchFormPage";

const baseUrl =
  "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList";

test.describe("PIM Search Form Tests", () => {
  let searchForm: SearchFormPage;

  test.beforeEach(async ({ page }) => {
    // LOGIN FIRST
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );

    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();

    await page.waitForURL("**/dashboard/index");

    // Navigate to PIM
    await page.getByRole("link", { name: "PIM" }).click();
    await page.waitForURL("**/pim/viewEmployeeList");

    searchForm = new SearchFormPage(page);
  });

  test("Verify that search form fields are visible", async () => {
    await expect(searchForm.employeeNameInput).toBeVisible();
    await expect(searchForm.employeeIdInput).toBeVisible();
    await expect(searchForm.employmentStatusDropdown).toBeVisible();
    await expect(searchForm.includeDropdown).toBeVisible();
    await expect(searchForm.supervisorNameInput).toBeVisible();
    await expect(searchForm.jobTitleDropdown).toBeVisible();
    await expect(searchForm.subUnitDropdown).toBeVisible();
  });

  test("Select Employment Status", async () => {
    await searchForm.selectEmploymentStatus("Full-Time Permanent");
    await expect(searchForm.employmentStatusDropdown).toContainText(
      "Full-Time Permanent",
    );
  });

  test("Search button works when name is entered", async () => {
    await searchForm.fillEmployeeName("John");
    await searchForm.submitForm();

    await expect(searchForm.resultsTable).toBeVisible();
  });

  test("Reset clears fields", async () => {
    await searchForm.fillEmployeeName("John");
    await searchForm.fillEmployeeId("123");

    await searchForm.resetForm();

    await expect(searchForm.employeeNameInput).toHaveValue("");
    await expect(searchForm.employeeIdInput).toHaveValue("");
  });
  test("Valid supervisor name shows autocomplete suggestions", async () => {
    await searchForm.fillSupervisorName("John");

    await expect(
      await searchForm.isSupervisorAutocompleteVisible(),
    ).toBeTruthy();

    const count = await searchForm.getSupervisorSuggestionsCount();
    expect(count).toBeGreaterThan(0);
  });
  test("Partial supervisor name shows multiple suggestions", async () => {
    await searchForm.fillSupervisorName("Jo");

    await expect(
      await searchForm.isSupervisorAutocompleteVisible(),
    ).toBeTruthy();

    const count = await searchForm.getSupervisorSuggestionsCount();
    expect(count).toBeGreaterThanOrEqual(1);
  });
  test("Search works using supervisor name only", async () => {
    await searchForm.fillSupervisorName("John");
    await searchForm.submitForm();

    await expect(searchForm.resultsTable).toBeVisible();
  });
});
