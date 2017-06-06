/**
 * Created by cyber-PC on 14.04.2017.
 */

$.fn.xpathEvaluate = function (xpathExpression) {
    try {
        $this = this.first();
        var xpathResult = this[0].evaluate(xpathExpression, this[0], null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        var result = [];
        var elem;
        while (elem = xpathResult.iterateNext())
            result.push(elem);
        return result;
    } catch (e) {
        return [];
    }
};

function bestExpression(elements, approaches) {
    var pCount = undefined, bestExpression = null, element = null;
    for (var i = 0; i < elements.length; i++) {
        var expression = new XExpression();
        var a = elements[i];
        for (var j = 0; j < approaches.length; j++)
            expression.addParamByApproach(a, approaches[j].copy());
        if (!expression.isEmpty()) {
            var count = getElementByXpath("*//" + a.tagName + expression.toString()).length;
            if (pCount === undefined || pCount > count) {
                bestExpression = expression;
                element = elements[i];
                pCount = count;
            }
        }
    }
    return {element: element, expression: bestExpression};
}

/**
* Делает для примера, из массива [2, 3] -> [1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3].
*/
function generateNumberRows(inputArr) {
  var results = [];
  var pArray = [];
  var i = 0;
  for (; i < inputArr.length; i++)
    pArray.push(1);
  results.push(pArray);
  var length = inputArr.length;
  while (JSON.stringify(inputArr) !== JSON.stringify(pArray) ) {
    var t = pArray.slice();
    for (i = length - 1; i >= 0; i--) {
      if (t[i] !== inputArr[i]) {
        t[i]++;
        break;
      } else t[i] = 1;
    }
    results.push(pArray = t);
  }
  return results;
}

function getFollowingSibling(element) {
	var result = [];
	while(element.nextSibling !== null)
		result.push(element = element.nextSibling);
	return result;
}

function applyApproaches(elements, approaches, functionName) {
    var strategy = new XStrategy('meta', approaches);
    var result = [];
    for (var i = 0; i < elements.length; i++) {
        var object = new XObject(elements[i]);
        if (object.validate()) {
            var route = new XRoute(elements[i]);
            route.add(object);
            if (object.applyStrategy(strategy.copy(), route)) {
                result.push(XFunction[functionName](object));
            }
        }
    }
    return result;
}

function getAncestors(element) {
  var ancestors = [];
  var p = element.parentElement;
  while (p !== undefined && p !== null && p !== p.ownerDocument.documentElement) {
    ancestors.push(p);
    p = p.parentElement;
  }
  return ancestors;
}

String.prototype.format = function (args) {
    return this.replace(/{(\d+)}/g, function (match, number) {
        var arg = args[number];
        if (arg === undefined || arg === number)
            return match;
        if (arg.toString !== undefined)
            return arg.toString();
        return args[number];
    });
};

function copy(o) {
    var output, v, key;
    output = Array.isArray(o) ? [] : {};
    for (key in o) {
        v = o[key];
        output[key] = (typeof v === "object") ? copy(v) : v;
    }
    return output;
}

function getElementByXpath(path) {
    return $(document).xpathEvaluate(path);
}
