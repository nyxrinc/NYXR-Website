// Production website acceptance for the current multi-page layout.
import { preview } from 'vite';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const output='qa/nexus';await mkdir(output,{recursive:true});
const server=await preview({preview:{host:'127.0.0.1',port:0}});
const base=server.resolvedUrls.local[0];
const browser=await chromium.launch({headless:true,...(process.env.NYXR_BROWSER_PATH?{executablePath:process.env.NYXR_BROWSER_PATH}:{})});
const report={checks:[],errors:[],accessibility:[],scope:'Built production pages; isolated headless browser. No real installer download.'};
function check(name,value=true){assert.ok(value,name);report.checks.push(name);}
try {
  for(const reducedMotion of ['reduce','no-preference']){
    const context=await browser.newContext({reducedMotion});const page=await context.newPage();
    page.on('pageerror',e=>report.errors.push(e.message));
    page.on('response',r=>{if(r.status()>=400)report.errors.push(`${r.status()} ${r.url()}`);});
    for(const [width,height] of [[1366,768],[1650,900],[1920,1080],[390,844]]){
      await page.setViewportSize({width,height});await page.goto(base,{waitUntil:'networkidle'});
      await page.locator('.boot-screen').waitFor({state:'detached'});
      check(`Home no overflow ${width}/${reducedMotion}`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      check(`NYXR identity ${width}/${reducedMotion}`,await page.locator('h1').innerText().then(s=>s.includes('NYXR')));
      const image=page.locator('.hero-main-shot img');await image.evaluate(img=>img.decode());
      check('Actual NEXUS capture loads',await image.evaluate(img=>img.naturalWidth===1650));
      check('Original geometric core glyph',await page.locator('.core-glyph path').count()>0);
      check('Home leaves pricing on Pricing',!/(?:₹\s*\d|\$\s*\d|billion tokens|freebuff)/i.test(await page.locator('main').innerText()));
      if(reducedMotion==='reduce')await page.screenshot({path:`${output}/home-${width}.png`,fullPage:true});
    }
    await page.setViewportSize({width:1650,height:900});await page.goto(base+'personalization/',{waitUntil:'networkidle'});
    for(const name of ['NEXUS','NYXR Core','Hacker','Cyber Violet','Arctic','Ember','Minimal Light']){
      await page.getByRole('button',{name,exact:true}).click();
      check(`${name} visibly selected`,await page.getByRole('button',{name,exact:true}).getAttribute('aria-pressed')==='true');
      const image=page.locator('.theme-preview img');await image.evaluate(img=>img.decode());
      check(`${name} actual image decodes`,await image.evaluate(img=>img.naturalWidth===1650));
      check(`${name} stays visible`,await page.locator('.theme-showcase').evaluate(el=>getComputedStyle(el).opacity==='1'));
    }
    await page.getByRole('button',{name:'NEXUS',exact:true}).click();
    await page.getByRole('button',{name:'Enlarge NEXUS capture',exact:true}).click();
    await page.locator('.lightbox-image img').waitFor({state:'visible'});await page.keyboard.press('Escape');
    check('NEXUS lightbox closes',await page.locator('.lightbox-image img').count()===0);
    await page.goto(base+'guide/',{waitUntil:'networkidle'});
    check('Guide explains separate audio steps',await page.locator('main').innerText().then(s=>s.includes('Listening and speaking, separately')&&s.includes('two-second local signal check')&&s.includes('Skip a step')));
    if(reducedMotion==='reduce'){
      for(const route of ['', 'personalization/', 'guide/']){
        await page.goto(base+route,{waitUntil:'networkidle'});
        const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
        report.accessibility.push({route,violations:result.violations.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target)}))});
        check('Accessibility '+route,result.violations.length===0);
      }
    }
    await context.close();
  }
  check('No browser errors or failed assets',report.errors.length===0);report.passed=true;
} finally {
  await writeFile(`${output}/results.json`,JSON.stringify(report,null,2));await browser.close();
  await new Promise(done=>server.httpServer.close(done));
}
console.log(JSON.stringify({passed:report.passed,checks:report.checks.length,accessibility:report.accessibility.length}));
