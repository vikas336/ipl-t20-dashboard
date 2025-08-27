import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
import type { Browser } from "puppeteer-core";

async function getBrowser(): Promise<Browser> {
  return await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });
}

export async function fetchFixtures() {
  let browser: Browser | null = null;
  try {
    browser = await getBrowser();
    const page = await browser.newPage();
    await page.goto("https://www.iplt20.com/matches/fixtures", { waitUntil: "networkidle2" });

    const fixtures = await page.evaluate(() => {
      const data: any[] = [];
      document.querySelectorAll("a.fixtures-list__match").forEach((el: any) => {
        data.push({
          home: el.querySelector(".team--home .team__name")?.textContent?.trim(),
          away: el.querySelector(".team--away .team__name")?.textContent?.trim(),
          date: el.querySelector(".fixture__date")?.textContent?.trim(),
          time: el.querySelector(".fixture__time")?.textContent?.trim(),
          venue: el.querySelector(".fixture__venue")?.textContent?.trim(),
          matchNo: el.querySelector(".fixture__match-number")?.textContent?.trim(),
        });
      });
      return data;
    });
    return fixtures;
  } catch (err) {
    console.error("fetchFixtures error", err);
    return null;
  } finally {
    if (browser) await browser.close();
  }
}

export async function fetchPointsTable() {
  let browser: Browser | null = null;
  try {
    browser = await getBrowser();
    const page = await browser.newPage();
    await page.goto("https://www.iplt20.com/points-table/men/2025", { waitUntil: "networkidle2" });

    const table = await page.evaluate(() => {
      const rows: any[] = [];
      document.querySelectorAll("table tbody tr").forEach((tr: any) => {
        const tds = tr.querySelectorAll("td");
        if (tds.length >= 6) {
          rows.push({
            team: tds[0]?.innerText.trim(),
            played: tds[1]?.innerText.trim(),
            wins: tds[2]?.innerText.trim(),
            losses: tds[3]?.innerText.trim(),
            points: tds[4]?.innerText.trim(),
            nrr: tds[5]?.innerText.trim(),
          });
        }
      });
      return rows;
    });
    return table;
  } catch (err) {
    console.error("fetchPointsTable error", err);
    return null;
  } finally {
    if (browser) await browser.close();
  }
}

export async function fetchLiveOrUpcoming() {
  let browser: Browser | null = null;
  try {
    browser = await getBrowser();
    const page = await browser.newPage();
    await page.goto("https://www.iplt20.com", { waitUntil: "networkidle2" });

    const live = await page.evaluate(() => {
      const liveCard = document.querySelector(".match-status--live, .match-card--live");
      if (liveCard) {
        return {
          status: "live",
          teams: {
            home: liveCard.querySelector(".team--home .team__name")?.textContent?.trim(),
            away: liveCard.querySelector(".team--away .team__name")?.textContent?.trim(),
          },
          summary: liveCard.querySelector(".match-status__summary")?.textContent?.trim(),
          venue: liveCard.querySelector(".fixture__venue")?.textContent?.trim(),
          time: ""
        };
      }
      return null;
    });

    if (live) return live;

    // fallback → first upcoming fixture
    const fixtures = await fetchFixtures();
    if (fixtures && fixtures.length) {
      return { status: "upcoming", ...fixtures[0] };
    }
    return null;
  } catch (err) {
    console.error("fetchLiveOrUpcoming error", err);
    return null;
  } finally {
    if (browser) await browser.close();
  }
}
