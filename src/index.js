/** @format */

/**
 *
 * @param {number} sec - 時間(秒)
 */
function delay(sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
}

/**
 *
 * @param {string} phrase - アドレスバーに表示したい文字列
 * @param {number} time - 増やしていく時間(秒)
 */
const addressCream = async (phrase, time) => {
  for (let i = 0; i <= phrase.length; i++) {
    console.log(phrase.substring(0, i));
    history.replaceState("", "", "#" + phrase.substring(0, i));
    await delay(time);
  }
};

module.exports = addressCream;
