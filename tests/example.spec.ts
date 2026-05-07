import { test, expect } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('[data-testid="home-page"]')).toBeVisible();
  await expect(page.locator('[data-testid="home-title"]')).toContainText("Welcome to Vet Clinic");
});

test("navigate to pets list", async ({ page }) => {
  await page.goto("/");
  await page.click('[data-testid="nav-pets"]');
  await expect(page.locator('[data-testid="pets-list-page"]')).toBeVisible();
});

test("navigate to add pet page", async ({ page }) => {
  await page.goto("/pets/new");
  await expect(page.locator('[data-testid="add-pet-page"]')).toBeVisible();
  await expect(page.locator('[data-testid="add-pet-title"]')).toContainText("Add New Pet");
});

test("can add a new pet", async ({ page }) => {
  await page.goto("/pets/new");
  await page.fill('[data-testid="pet-name-input"]', "Test Dog");
  await page.fill('[data-testid="pet-species-input"]', "Dog");
  await page.fill('[data-testid="pet-breed-input"]', "Labrador");
  await page.click('[data-testid="pet-submit-btn"]');
  await expect(page.locator('[data-testid="pet-detail-page"]')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('[data-testid="pet-detail-name"]')).toContainText("Test Dog");
});

test("vaccination log page loads", async ({ page }) => {
  await page.goto("/vaccinations");
  await expect(page.locator('[data-testid="vaccination-log-page"]')).toBeVisible();
  await expect(page.locator('[data-testid="vax-log-title"]')).toContainText("Vaccination Log");
});
