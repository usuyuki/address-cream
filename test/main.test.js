/** @format */

const expect = chai.expect;

function delay(sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
}

describe("addressCream", async () => {
  it("指定子した文字列が指定した間隔でURLのアンカー部分に出てくるか", () => {
    let phrase = "寿司食べたい";
    let time = 1;
    try {
      addressCream.constant(phrase, time);
      console.log("phrase:" + phrase);
      for (let i = 0; i <= phrase.length; i++) {
        console.log("a:" + location.hash);
        console.log("b:" + phrase.substring(0, i));
        expect(location.hash).to.equal(phrase.substring(0, i));
        delay(time);
      }
    } catch (e) {
      throw e;
    }
  });
});
