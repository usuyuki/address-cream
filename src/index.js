/** @format */

/**
 * @param {number} sec - 時間(秒)
 */
function delay(sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
}

/** @enum {function} */
const addressCream = {
  /**
   * アドレスバーリセット用
   * @returns {void}
   */
  reset: function (phrase, time) {
    history.replaceState("", "", " ");
  },

  /**
   * 停止用
   * @param {number} time - 待ち時間(秒)
   * @returns {void}
   */
  sleep: async function (time) {
    if (time <= 0) {
      throw new Error(" 時間は正の数にしてね。");
    }
    await delay(time);
  },

  /**
   * 単調に増やす
   * @param {string} phrase - アドレスバーに表示したい文字列
   * @param {number} time - 増やしていく時間(秒)
   * @param {string} [particleS = null] - 最後に動かす絵文字
   * @param {string} [particleE = null]  - 最後に動かす絵文字
   * @param {number} [particleT = time]  - 最後に動かす絵文字の切り替え時間
   * @returns {void}
   */
  constant: async (
    phrase,
    time,
    particleS = null,
    particleE = null,
    particleT = time
  ) => {
    if (time <= 0 || particleT <= 0) {
      throw new Error(" 時間は正の数にしてね。");
    }
    for (let i = 0; i <= phrase.length; i++) {
      history.replaceState("", "", "#" + phrase.substring(0, i));
      await delay(time);
    }
    time = particleT ?? time;
    if (particleS != null && particleE != null) {
      while (true) {
        history.replaceState(
          "",
          "",
          "#" + phrase.substring(0, phrase.length) + particleS
        );
        await delay(time);
        history.replaceState(
          "",
          "",
          "#" + phrase.substring(0, phrase.length) + particleE
        );
        await delay(time);
      }
    }
  },

  /**
   * 単調に増やして戻る
   * @param {string} phrase - アドレスバーに表示したい文字列
   * @param {number} incrementTime - 増やしていく時間(秒)
   * @param {number} decrementTime - 減らしていく時間(秒)
   * @returns {void}
   */
  goBack: async (phrase, incrementTime, decrementTime) => {
    if (incrementTime <= 0 || decrementTime <= 0) {
      throw new Error(" 時間は正の数にしてね。");
    }
    for (let i = 0; i <= phrase.length; i++) {
      history.replaceState("", "", "#" + phrase.substring(0, i));
      await delay(incrementTime);
    }
    for (let j = phrase.length; j >= 0; j--) {
      history.replaceState("", "", "#" + phrase.substring(0, j));
      await delay(decrementTime);
    }
    history.replaceState("", "", " ");
  },

  /**
   * 単調に増やす
   * @param {string} phrase - アドレスバーに表示したい文字列
   * @param {number} time - 増やしていく時間(秒)
   * @param {number} size - 同時に表示する文字数
   * @returns {void}
   */
  flow: async (phrase, time, size) => {
    if (time <= 0) {
      throw new Error(" 時間は正の数にしてね。");
    }
    if (size > phrase.length) {
      throw new Error(
        " 同時に表示する文字数はアドレスバーに入れる文字数より小さくしてね。"
      );
    }
    let j = 0;
    for (let i = size; i <= phrase.length; i++) {
      history.replaceState("", "", "#" + phrase.substring(j, i));
      j += 1;
      await delay(time);
    }
    /** 文字数末端移行でなめらかに消えていくための処理 */
    while (true) {
      history.replaceState("", "", "#" + phrase.substring(j, phrase.length));
      j += 1;
      if (j + size == phrase.length) {
        break;
      }
      await delay(time);
    }
    history.replaceState("", "", " ");
  },
};

module.exports = addressCream;
// export default addressCream;
