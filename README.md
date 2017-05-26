## Jedi QA v0.1-ALPHA
**Jedi QA** - is Google Chrome Extension for Automated UI Web Testing. This tool can create a Page Object by some pattern or just suggest XPath queries by the сonfigurable set of strategies.

#### How to install
1. Download it as a zip archive and unzip into the folder.
2. Open *Google Chrome*.
3. Go to **chrome://extensions** and check the box for *Developer mode* in the top right.
4. Press on *Load unpecked extension...*.
5. Specify the unzipped folder.

### Getting started with Jedi QA
#### Step 1
After of installation you can see sith lightsabers into the extensions bar, press on this icon. After opened of a extension popup You can load your pattern by pressing on *Browse...*. In next time, in order to load the same pattern just press on *Saved*.
<p align="center"><img src ="https://github.com/cyberspaceru/Jedi/blob/master/imgs/root-readme-01.png"/></p>
Then fill this fields accordance with your web-page.

#### Step 2
In step 2 need to create variables for the page object. In order to do it open DevTools (F12 or Ctrl + Shift + I) and go to the 'Elements' tab. Into this tab press on the 'Variable' side bar where you can create variables. Use DOM-tree or instrument (Ctrl + Shift + C) to select some node. 

<p align="center"><img src ="https://github.com/cyberspaceru/Jedi/blob/master/imgs/root-readme-02.png"/></p>

After this action will suggest some queries (or 1) into the 'Variable' side bar. Select one of them and press on the next-arrow.

<p align="center"><img src ="https://github.com/cyberspaceru/Jedi/blob/master/imgs/root-readme-03.png"/></p>

Then just fill fields for this variable.

#### Step 3
The last step is creation of the code listing. Go to the 'Jedi QA' DevTools tab and press on 'Code'. Then just select the code pattern and click on 'Generate' button.
