import { expect } from '@playwright/test';
import { test } from '../playwright-test';

import { cnLoginForm } from '../../src/components/LoginForm/LoginForm.classname';

test('login form plain', async ({ page }) => {
    await page.goto('http://localhost:8080');

    const loginForm = page.locator('.' + cnLoginForm());
    await expect(loginForm).toBeVisible();

    const enterButton = page.locator('.' + cnLoginForm('Button'));

    await expect(enterButton).toBeVisible();
    await expect(enterButton).toBeDisabled();

    await expect(loginForm).toHaveScreenshot('plain.png');
});

test('login form enter', async ({ page }) => {
    await page.goto('http://localhost:8080');

    const loginForm = page.locator('.' + cnLoginForm());
    const enterButton = page.locator('.' + cnLoginForm('Button'));
    const loginInput = page.locator('.' + cnLoginForm('Login'));
    const passwordInput = page.locator('.' + cnLoginForm('Password'));

    await loginInput.fill('dusty');
    await passwordInput.fill('123');

    await expect(enterButton).not.toBeDisabled();
    await enterButton.click();

    await expect(loginForm).not.toBeVisible();
});
