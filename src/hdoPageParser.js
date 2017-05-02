module.exports = function(_, jQuery) {

  async function parseData(data) {
    const $ = await jQuery();
    let parsed = $(data);

    let firstBar = $(parsed.find('.hdo-bar')[0]);

    let children = firstBar.children();
    let spansNt = firstBar.find('span.hdont');

    let fromToTexts = spansNt.map((i, span) => {
      let index = $(span).index();
      let fromToText = $(children[index + 1]).attr('title').toString();
      return fromToText;
    }).toArray();

    let lowPlan = fromToTexts.map(fromTo => {
      let match = fromTo.split(' - ');
      return { from: match[0], to: match[1]  }
    });

    return { lowPlan };
  }

  return parseData;

}
