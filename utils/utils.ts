import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import * as fs from 'fs';

export async function compareScreenshots(
    baselineScreenshot: Buffer,
    newScreenshot: Buffer,
    threshold = 0.1
): Promise<boolean> {
    const baselinePNG = PNG.sync.read(baselineScreenshot);
    const newPNG = PNG.sync.read(newScreenshot);
    const { width, height } = baselinePNG;

    const diff = new PNG({ width, height });
    const numDiffPixels = pixelmatch(baselinePNG.data, newPNG.data, diff.data, width, height, {
        threshold,
    });

    // Save the diff image to disk for debugging purposes
    if (numDiffPixels > 0) {
        const diffScreenshot = PNG.sync.write(diff);
        await fs.promises.writeFile('screenshots/diff.png', diffScreenshot);
    }

    // Return true if the number of different pixels is below the threshold
    return numDiffPixels / (width * height) < threshold;
}