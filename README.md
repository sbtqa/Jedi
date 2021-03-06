## Jedi QA v0.1-ALPHA (For Chrome Version 48 or high)
**Jedi QA** - is a Google Chrome Extension for Automated UI Web Testing. This tool can create a Page Object by some pattern or just suggest XPath queries by the сonfigurable set of strategies.

[![Jedi QA User's Guide](https://img.youtube.com/vi/t4g8YNalGkA/0.jpg)](https://www.youtube.com/watch?v=t4g8YNalGkA)

#### How to install
1. Download it as a zip archive and unzip into the folder.
2. Open *Google Chrome*.
3. Go to **chrome://extensions** and check the box for *Developer mode* in the top right.
4. Click *Load unpecked extension...*.
5. Specify the unzipped folder.

### Getting started with Jedi QA
#### Step 1
After installation you will see sith lightsabers in the extensions bar, click on this icon. After opening the extension popup You can load your pattern by clicking *Browse...*. Next time, in order to load the same pattern just click *Saved*.
<p align="center"><img src ="https://github.com/cyberspaceru/Jedi/blob/master/wiki/imgs/popup.png"/></p>
Then fill in these fields in accordance with your web-page.

#### Step 2
In step 2, you need to create variables for the page object. In order to do it : open DevTools (F12 or Ctrl + Shift + I) and go to the 'Elements' tab. In this tab click on the 'Variable' side bar where you can create variables. Use DOM-tree or instrument (Ctrl + Shift + C) to select a node.

<p align="center"><img src ="https://github.com/cyberspaceru/Jedi/blob/master/imgs/root-readme-02.png"/></p>

After this action, the extension will suggest some queries (or 1) in the 'Variable' side bar. Select one of them and click on the next-arrow.

<p align="center"><img src ="https://github.com/cyberspaceru/Jedi/blob/master/imgs/root-readme-03.png"/></p>

Then just fill in the fields for this variable and click on the 'Ok' button in the top panel.

#### Step 3
The last step is creating the code listing. Go to the 'Jedi QA' DevTools tab and click on the 'Update' button <img src="https://github.com/cyberspaceru/Jedi/blob/master/devtools/tab/img/update.png" height="18"> in the left corner of the menu. Then go to the 'Code' menu item and just select the code pattern and click on the 'Generate' button.
