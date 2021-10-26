# What is Magic PHO Viewer
PHO is supposed to be a forum and while the regular PHO formatting is trying it's best to look like a forum it can't really look a forum. This script changes uses the formating already present in PHO interludes and turns the PHO posts into posts that look like Sufficant Velocity/Space Battles posts.

# How to load/install

## Method 1 (recomended)

1. Install the Tampermonkey addon: [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
2. Click on this [link](https://github.com/KeinNiemand/MagicPHOViewer/raw/master/MagicPHOViewerLoader.user.js) then click on install

## Method 2

1. Create a new bookmark with the following url:

		javascript:(function() {$("body").append("<script src='https://raw.githack.com/KeinNiemand/MagicPHOViewer/master/MagicPHOViewerLoader.user.js' crossorigin='anonymous'><\/script>")}());
		
2. Go to the page on Sufficient Velocity/Space Battles that has the PHO interlude you want to view.
3. Click on the bookmark

## Method 3

1. Go to the page of Sufficient Velocity/Space Battles that has the PHO interlude you want to view.
2. Open your browser debug console (Ctrl + Shift + J for Chrome)
3. Copy and Paste this code into the console and press enter:

		$("body").append("<script src='https://raw.githack.com/KeinNiemand/MagicPHOViewer/master/MagicPHOViewerLoader.user.js' crossorigin='anonymous'><\/script>")
	
# How to Use

When the script is loaded PHO topics in PHO interludes will turn into links, simply click on the links to view them with Magic PHO Viewer.
For PHO interludes with multiple topics you can navigate between pages with Sufficiant Velocitys/Space Battles Previous Page and next page buttons.
If you want to return to the regular view click the back to normal view button next to to the previous/next page buttons.

# Reporting Bugs/Suggesting Improvments

If you find a bug or want to suggest an improvment please open an [Issue](https://github.com/KeinNiemand/MagicPHOViewer/issues/new)

# Contributing

If you want to contribute, fork this repo and create a pull request.
