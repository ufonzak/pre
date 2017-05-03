module.exports = function inj(_, jQuery) {
  async function parseData(data) {
    const $ = await jQuery();
    const parsed = $(data);

    const firstBar = $(parsed.find('.hdo-bar')[0]);

    const children = firstBar.children();
    const spansNt = firstBar.find('span.hdont');

    const fromToTexts = spansNt.map((i, span) => {
      const index = $(span).index();
      const fromToText = $(children[index + 1]).attr('title').toString();
      return fromToText;
    }).toArray();

    const lowPlan = fromToTexts.map((fromTo) => {
      const match = fromTo.split(' - ');
      return {
        from: match[0],
        to: match[1],
      };
    });

    return { lowPlan };
  }

  return parseData;
};
