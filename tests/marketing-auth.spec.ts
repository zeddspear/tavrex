import { expect, test } from './fixtures';

const viewports = [
  { width: 1920, height: 1080 },
  { width: 1440, height: 900 },
  { width: 1280, height: 900 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 430, height: 932 },
  { width: 390, height: 844 },
];

test('public product story stays contained and leads to signup at seven widths', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium');
  test.setTimeout(120000);
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await expect(
      page.getByRole('heading', {
        name: /The meeting ends.*The meaning stays/,
      }),
    ).toBeVisible();
    await expect(page.locator('.hero-art .art-intelligence')).toContainText(
      'Send the revised proposal',
    );
    const height = await page.evaluate(
      () => document.documentElement.scrollHeight,
    );
    for (const y of [0, height / 2, height]) {
      await page.evaluate((value) => scrollTo(0, value), y);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      ).toBe(true);
    }
  }
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(
    page.getByRole('navigation', { name: 'Marketing navigation' }),
  ).toBeVisible();
  await page
    .getByRole('navigation', { name: 'Marketing navigation' })
    .getByRole('link', { name: 'Use cases', exact: true })
    .click();
  await expect(page).toHaveURL(/#use-cases$/);
  await expect(page.locator('a[href^="/app"]')).toHaveCount(0);
  await page
    .locator('.marketing-hero-actions')
    .getByRole('link', { name: 'Get started free' })
    .click();
  await expect(page).toHaveURL(/\/signup$/);
  await expect(page.getByLabel('Email address')).toBeVisible();
});

test('marketing illustrations explain source navigation, summaries and search', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: /02 \/ TRANSCRIPT/ }).click();
  await expect(page.locator('.transform-object')).toContainText(
    'Sarah · 12:47',
  );
  await page
    .locator('.transcript-rows')
    .getByRole('button', { name: /18:42/ })
    .click();
  await expect(page.locator('.transcript-seek')).toContainText('18:42');
  const summary = page.locator('.summary-demo-copy h3');
  const general = await summary.innerText();
  await page
    .getByRole('button', { name: 'Sales / Customer', exact: true })
    .click();
  await expect(summary).not.toHaveText(general);
  const sales = await summary.innerText();
  await page
    .getByRole('button', { name: 'Recruiting / Interview', exact: true })
    .click();
  await expect(summary).not.toHaveText(sales);
  await page.getByRole('button', { name: /Source · 12:47/ }).click();
  await expect(page.locator('.evidence-scene')).toHaveClass(/is-connected/);
  await page.getByLabel('Search conversations').fill('proposal');
  await expect(page.locator('.search-demo-results mark').first()).toHaveText(
    'proposal',
  );
  await page.getByLabel('Search conversations').fill('zzzz');
  await expect(page.locator('.search-demo-results')).toContainText(
    'No example conversations match',
  );
  await page.getByRole('button', { name: /Shared view/ }).click();
  await expect(page.locator('.moments-art')).toHaveClass(/is-sharing/);
  await page.getByRole('button', { name: 'Saved moment' }).click();
  await expect(page.locator('.moments-art')).not.toHaveClass(/is-sharing/);
  await page.getByRole('button', { name: /02 Sales conversations/ }).click();
  await expect(page.locator('.use-cases-panel')).toContainText(
    'Keep commitments connected',
  );
  await page.getByText('Which files can I upload?').click();
  await expect(page.locator('.faq-list details').nth(1)).toHaveAttribute(
    'open',
    '',
  );
  await expect(page).toHaveURL(/\/$/);
});

test('dark secondary button stays legible on hover', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  const button = page.getByRole('link', { name: 'See how it works' });
  await button.hover();
  await expect
    .poll(async () =>
      button.evaluate((node) => {
        const style = getComputedStyle(node);
        return [style.color, style.backgroundColor];
      }),
    )
    .toEqual(['rgb(240, 243, 236)', 'rgb(34, 45, 38)']);
});

test('immediate signup enters the existing dashboard when confirmation is disabled', async ({
  page,
}) => {
  const user = {
    id: '77777777-7777-4777-8777-777777777777',
    email: 'new-person@example.com',
  };
  let signed = false;
  await page.route('**/api/auth/**', (route) => {
    const path = new URL(route.request().url()).pathname;
    if (path.endsWith('/session'))
      return route.fulfill({ json: { user: signed ? user : null } });
    if (path.endsWith('/signup')) {
      signed = true;
      return route.fulfill({ json: { user } });
    }
    return route.fallback();
  });
  await page.goto('/signup');
  await page.getByLabel('Email address').fill(user.email);
  await page.getByLabel('Password', { exact: true }).fill('secure-passphrase');
  await page.getByRole('button', { name: 'Get started free' }).click();
  await expect(page).toHaveURL(/\/app$/);
  await expect(
    page.getByRole('heading', { name: 'Your conversations. All connected.' }),
  ).toBeVisible();
  if (page.viewportSize()!.width <= 600)
    await expect(page.getByText('Account workspace')).toBeVisible();
  else await expect(page.getByText(user.email)).toBeVisible();
});

test('signup waits for actual confirmation; errors and password visibility are usable', async ({
  page,
}) => {
  await page.route('**/api/auth/signup', (route) =>
    route.fulfill({ json: { confirmationRequired: true } }),
  );
  await page.goto('/');
  await page.getByRole('link', { name: 'Get started free' }).first().click();
  await expect(page).toHaveURL(/\/signup$/);
  await page.getByRole('button', { name: 'Get started free' }).click();
  await expect(page.getByRole('alert')).toContainText('valid email');
  await page.getByLabel('Email address').fill('person@example.com');
  await page.getByLabel('Password', { exact: true }).fill('secure-passphrase');
  await page.getByRole('button', { name: 'Show password' }).click();
  await expect(page.getByLabel('Password', { exact: true })).toHaveAttribute(
    'type',
    'text',
  );
  await page.getByRole('button', { name: 'Get started free' }).click();
  await expect(
    page.getByRole('heading', { name: 'Check your inbox' }),
  ).toBeVisible();
  await expect(page).toHaveURL(/\/signup$/);
  await expect(page.locator('a[href^="/app"]')).toHaveCount(0);
  await page.getByRole('link', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/\/login$/);
});

test('confirmed login enters existing app and sign-out returns to the public site', async ({
  page,
}) => {
  const user = {
    id: '77777777-7777-4777-8777-777777777777',
    email: 'person@example.com',
  };
  let signed = false;
  await page.route('**/api/auth/**', (route) => {
    const path = new URL(route.request().url()).pathname;
    if (path.endsWith('/session'))
      return route.fulfill({ json: { user: signed ? user : null } });
    if (path.endsWith('/login')) {
      signed = true;
      return route.fulfill({ json: { user } });
    }
    if (path.endsWith('/logout')) {
      signed = false;
      return route.fulfill({ json: { signedOut: true } });
    }
    return route.fallback();
  });
  await page.goto('/login');
  await expect(
    page.getByRole('heading', { name: 'Pick up where the meeting left off.' }),
  ).toBeVisible();
  await page.getByLabel('Email address').fill(user.email);
  await page.getByLabel('Password', { exact: true }).fill('secure-passphrase');
  await expect(page.getByLabel('Email address')).toHaveValue(user.email);
  await expect(page.getByLabel('Password', { exact: true })).toHaveValue(
    'secure-passphrase',
  );
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page).toHaveURL(/\/app$/);
  await expect(
    page.getByRole('heading', { name: 'Your conversations. All connected.' }),
  ).toBeVisible();
  if (page.viewportSize()!.width <= 600)
    await expect(page.getByText('Account workspace')).toBeVisible();
  else await expect(page.getByText(user.email)).toBeVisible();
  await page.goto('/signup');
  await expect(page).toHaveURL(/\/app$/);
  await page.getByRole('button', { name: 'Sign out' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(
    page.getByRole('heading', { name: /The meeting ends.*The meaning stays/ }),
  ).toBeVisible();
});

test('confirmed email callback establishes a session and clears URL tokens', async ({
  page,
}) => {
  const user = {
    id: '77777777-7777-4777-8777-777777777777',
    email: 'person@example.com',
  };
  let signed = false;
  await page.route('**/api/auth/**', (route) => {
    const path = new URL(route.request().url()).pathname;
    if (path.endsWith('/session'))
      return route.fulfill({ json: { user: signed ? user : null } });
    if (path.endsWith('/complete')) {
      signed = true;
      return route.fulfill({ json: { user } });
    }
    return route.fallback();
  });
  await page.goto(
    `/auth/confirm#access_token=${'a'.repeat(80)}&refresh_token=${'r'.repeat(12)}&expires_in=3600`,
  );
  await expect(page).toHaveURL(/\/app$/);
  await expect(page).not.toHaveURL(/access_token/);
  if (page.viewportSize()!.width <= 600)
    await expect(page.getByText('Account workspace')).toBeVisible();
  else await expect(page.getByText(user.email)).toBeVisible();
});

test('theme follows system preference, persists override, and carries into auth', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(
    page.getByRole('button', { name: 'Switch to light mode' }).first(),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Switch to light mode' })
    .first()
    .click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page
    .locator('.marketing-hero-actions')
    .getByRole('link', { name: 'Get started free' })
    .click();
  await expect(page).toHaveURL(/\/signup$/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Switch to dark mode' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.goto('/login');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByLabel('Email address')).toBeVisible();
});

test('chosen theme follows login into the workspace and survives reload', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light' });
  const user = {
    id: '77777777-7777-4777-8777-777777777777',
    email: 'theme@example.com',
  };
  let signed = false;
  await page.route('**/api/auth/**', (route) => {
    const path = new URL(route.request().url()).pathname;
    if (path.endsWith('/session'))
      return route.fulfill({ json: { user: signed ? user : null } });
    if (path.endsWith('/login')) {
      signed = true;
      return route.fulfill({ json: { user } });
    }
    return route.fallback();
  });
  await page.goto('/');
  await page
    .getByRole('button', { name: 'Switch to dark mode' })
    .first()
    .click();
  await page.getByRole('link', { name: 'Sign in' }).first().click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByLabel('Email address').fill(user.email);
  await page.getByLabel('Password', { exact: true }).fill('secure-passphrase');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page).toHaveURL(/\/app$/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('.sidebar')).toHaveCSS(
    'background-color',
    'rgb(27, 36, 32)',
  );
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  await expect(page.locator('.sidebar')).toHaveCSS(
    'background-color',
    'rgb(240, 242, 239)',
  );
  await page.goto('/app/meetings/recording-walkthrough');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('reduced motion leaves content readable without entrance animation', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.art-intelligence')).toBeVisible();
  expect(
    await page
      .locator('.marketing-hero h1')
      .evaluate((node) => getComputedStyle(node).animationName),
  ).toBe('none');
  await page.getByRole('link', { name: 'See how it works' }).click();
  await expect(page).toHaveURL(/#product$/);
});
