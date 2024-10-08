import { chart_options } from "@app/types";

export default class Charter {
  protected data;
  protected array;

  config = {};

  constructor(data: any) {
    this.data = [];
    if (typeof data[0] === "object") {
      this.data = data;
    } else {
      this.array = data;
      for (let i = 0; i < data.length; i++) {
        this.data.push({ label: i + 1, value: data[i] });
      }
    }
  }
  chart(options: chart_options) {
    options.minHeight = options.minHeight || false;
    options.pattern = options.pattern || false;
    options.type = options.type || "sideways-bar";
    options.spaced = options.spaced || false;
    options.showLabels = options.hideLabels || false;
    let chart = "\n";
    /* Option variants */
    if (options.type === "sideways-bar") {
      // SIDEWAYS BARCHART
      let lines = [];
      let descY = 0; /* It's a variable that will be used to store the length of the longest label. */
      for (let i = 0; i < this.data.length; i++) {
        if (typeof this.data[i] === "object") {
          if (descY < String(this.data[i].label).length) {
            descY = String(this.data[i].label).length;
          }
        } else {
          if (descY < String(this.data[i]).length) {
            descY = String(this.data[i]).length;
          }
        }
      }
      if (options.hideLabels == true) {
        descY = 0;
      }
      for (let i = 0; i < this.data.length; i++) {
        if (typeof this.data[i] === "object") {
          lines.push(
            this.repeatCharacter(
              " ",
              descY - String(this.data[i].label).length,
            ) + (options.hideLabels ? "" : this.data[i].label),
          );
        } else {
          lines.push(
            this.repeatCharacter(" ", descY - String(i + 1).length) + (i + 1),
          );
        }
      }
      let min, max;
      if (typeof this.data[0] === "object") {
        max = Math.max.apply(
          Math,
          this.data.map(function (o:any) {
            return o.value + String(o.value).length + 1;
          }),
        );
        min = Math.min(
          ...this.data.map(function (o:any) {
            return o.value;
          }),
        );
        if (min > 1) {
          min = min - 1;
        } else {
          options.minHeight = false;
        }
      } else {
        max = Math.max(...this.data);
        if (Math.min(...this.data) > 1) {
          min = Math.min(...this.data) - 1;
        } else {
          min = Math.min(...this.data);
          options.minHeight = false;
        }
      }
      for (let i = 0; i < lines.length; i++) {
        if (typeof this.data[i] === "object") {
          lines[i] =
            lines[i] +
            " │" +
            (options.minHeight == true ? "║" : "") +
            this.repeatCharacter(
              options.pattern == true && i % 2 ? "▓" : "█",
              options.minHeight == true
                ? this.data[i].value - min
                : this.data[i].value,
            ) +
            " " +
            this.data[i].value;
        } else {
          lines[i] =
            lines[i] +
            " │" +
            (options.minHeight == true ? "║" : "") +
            this.repeatCharacter(
              options.pattern == true && i % 2 ? "▓" : "█",
              options.minHeight == true ? this.data[i] - min : this.data[i],
            ) +
            " " +
            this.data[i];
        }
      }
      // Looping over lines to add spaced lines if needed and to add the lines to the chart
      for (let i = 0; i < lines.length; i++) {
        if (options.spaced && i < lines.length - 1) {
          lines[i] = lines[i] + "\n" + this.repeatCharacter(" ", descY) + " │";
        }
        chart += lines[i] + "\n";
      }
      chart +=
        this.repeatCharacter(" ", descY) +
        " └" +
        this.repeatCharacter(
          "─",
          options.minHeight == true ? max - min + 1 : max,
        );
      return chart;
    } else if (options.type === "bar") {
      // BARCHART
      let spaced = options.spaced == true ? " " : "";
      let chart = "",
        descX = "";
      let maxHeight = Math.max.apply(
        Math,
        this.data.map(function (o: any) {
          return o.value;
        }),
      );
      let min = Math.min(
        ...this.data.map(function (o: any) {
          return o.value;
        }),
      );
      for (let i = 0; i < maxHeight; i++) {
        let ln = "";
        if (options.minHeight == true && i == 0) {
          let lnt = "";
          for (let j = 0; j < this.data.length; j++) {
            lnt += "═" + spaced;
          }
          chart = " │" + lnt + "\n" + chart;
        }
        for (let j = 0; j < this.data.length; j++) {
          if (this.data[j].value > i) {
            if (options.minHeight != true || i >= min - 1) {
              ln +=
                options.pattern == true && j % 2 ? "▓" + spaced : "█" + spaced;
            }
          } else {
            ln += " " + spaced;
          }
        }
        if (options.minHeight != true || i >= min - 1) {
          chart = " │" + ln + "\n" + chart;
        }

        if (options.hideLabels != true) {
          descX +=
            this.repeatCharacter(
              options.spaced ? "  " : " ",
              i + (options.spaced ? 1 : 2),
            ) +
            this.data[i].label +
            " (" +
            this.data[i].value +
            ")" +
            "\n";
        }
      }
      chart +=
        " └" +
        this.repeatCharacter(options.spaced ? "──" : "─", this.data.length) +
        "  " +
        "\n" +
        descX;
      return chart;
    } else if (options.type === "dot") {
      // DOTCHART
      let spaced = options.spaced ? " " : "";
      let chart = "",
        descX = "";
      let maxHeight = Math.max.apply(
        Math,
        this.data.map(function (o:any) {
          return o.value;
        }),
      );
      let min = Math.min(
        ...this.data.map(function (o:any) {
          return o.value;
        }),
      );
      for (let i = 0; i < maxHeight; i++) {
        let ln = "";
        if (options.minHeight && i == 0) {
          let lnt = "";
          for (let j = 0; j < this.data.length; j++) {
            lnt += "═" + spaced;
          }
          chart = " │" + lnt + "\n" + chart;
        }
        for (let j = 0; j < this.data.length; j++) {
          if (this.data[j].value == i) {
            if (options.minHeight != true || i >= min - 1) {
              ln += "·" + spaced;
            }
          } else {
            ln += " " + spaced;
          }
        }
        if (options.minHeight != true || i >= min - 1) {
          chart = " │" + ln + "\n" + chart;
        }

        if (options.hideLabels != true) {
          descX +=
            this.repeatCharacter(
              options.spaced ? "  " : " ",
              i + (options.spaced ? 1 : 2),
            ) +
            this.data[i].label +
            " (" +
            this.data[i].value +
            ")" +
            "\n";
        }
      }
      chart +=
        " └" +
        this.repeatCharacter(options.spaced ? "──" : "─", this.data.length) +
        "  " +
        "\n" +
        descX;
      return chart;
    }
  }

  /**
   * It sorts the data in the array by the value or label of the objects in the array, or by the
   * value of the array elements if the array contains only numbers
   * @param order - The order in which you want to sort the data. It can be "ASC" or "DESC". Default: "ASC"
   * @param sortBy - The property of the data to sort by. It can be "value" or "label". Default: "value"
   * @returns The data being sorted by the value or label.
   */
  sort(order:any, sortBy:any) {
    order = order.toUpperCase() || "ASC";
    sortBy = sortBy || "value";
    if (sortBy === "value") {
      this.data.sort(function (a:any, b:any) {
        return order == "ASC"
          ? a.value - b.value
          : order == "DESC"
            ? b.value - a.value
            : a.value - b.value;
      });
    } else if (sortBy === "label") {
      this.data.sort(function (a:any, b:any) {
        return order == "ASC"
          ? a.label > b.label
            ? 1
            : b.label > a.label
              ? -1
              : 0
          : order == "DESC"
            ? b.label > a.label
              ? 1
              : a.label > b.label
                ? -1
                : 0
            : a.label > b.label
              ? 1
              : b.label > a.label
                ? -1
                : 0;
      });
    } else {
      this.data.sort(function (a:any, b:any) {
        return order == "ASC" ? a - b : order == "DESC" ? b - a : a - b;
      });
    }
    return this; // Allowing calls chains
  }

  /**
   * converts the data array to a normal array
   * @param property - The property of the data array to convert to an array. Default is "value".
   * @returns array of the values of the data array
   */
  dataToArray(property = "value") {
    let arr = [];
    for (let i = 0; i < this.data.length; i++) {
      arr.push(this.data[i][property]);
    }
    return arr;
  }

  /**
   * It takes a character and a number, and returns a string of the character repeated the number of
   * times
   * @param c - The character to repeat
   * @param n - the number of times to repeat the character
   * @returns a string of the character c repeated n times.
   */
  repeatCharacter(c:any, n:any) {
    let a = "";
    for (let i = 0; i < n; i++) {
      a += c;
    }
    return a;
  }
}
