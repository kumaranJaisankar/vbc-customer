export const externalTooltipHandler = (context) => {
  console.log(context, ":context");
  // Tooltip Element
  let tooltipEl = document.getElementById("chartjs-tooltip");

  // Create element on first render
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = "chartjs-tooltip";
    tooltipEl.innerHTML = "<table style='margin:0; padding:0; width:100%;'></table>";
    document.body.appendChild(tooltipEl);
  }

  tooltipEl.style.background = "white";
  tooltipEl.style.minWidth = "100px";
  tooltipEl.style.maxWidth = "fit-content";
  tooltipEl.style.borderRadius = "5px";
  tooltipEl.style.border = "1px solid lightgray";

  // Hide if no tooltip
  let tooltipModel = context.tooltip;
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set caret Position
  tooltipEl.classList.remove("above", "below", "no-transform");
  if (tooltipModel.yAlign) {
    tooltipEl.classList.add(tooltipModel.yAlign);
  } else {
    tooltipEl.classList.add("no-transform");
  }

  function getBody(bodyItem) {
    return bodyItem.lines;
  }

  // Set Text
  if (tooltipModel.body) {
    let titleLines = tooltipModel.title || [];
    let bodyLines = tooltipModel.body.map(getBody);

    let innerHtml = "<thead>";

    bodyLines.forEach(function (body, i) {
      console.log(body);
      let style = "border-radius: 0px";
      style +=
        ";font-size: 10px; padding: 4px; text-align: center !important; width: 100% !important; color: #616C7C !important; font-weight:bold !important; padding-bottom: 2px; border-bottom: 0.3px solid lightgray;";
      let span =
        '<span class="text-sm" style="' +
        style +
        '"' +
        ">" +
        "<span style='margin-right:4px;'>&#11044;</span>" +
        body +
        " GB used" +
        "</span>";
      innerHtml += "<tr><th>" + span + "</td></th>";
    });
    innerHtml += "</thead><tbody>";

    titleLines.forEach(function (title) {
      innerHtml +=
        "<tr><td style='width:100%; margin-top:4px; text-align:center; font-size: 10px; color: #616C7C !important; font-weight:bold !important;'>" +
        title +
        "</th></td>";
    });
    innerHtml += "</tbody>";

    let tableRoot = tooltipEl.querySelector("table");
    tableRoot.innerHTML = innerHtml;
  }

  let position = context.chart.canvas.getBoundingClientRect();
  // let bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.position = "absolute";
  tooltipEl.style.left =
    position.left + window.pageXOffset + tooltipModel.caretX + 5 + "px";
  tooltipEl.style.top =
    position.top + window.pageYOffset + tooltipModel.caretY + "px";
  // tooltipEl.style.font = bodyFont.string;
  tooltipEl.style.padding =
    tooltipModel.padding + "px " + tooltipModel.padding + "px";
  tooltipEl.style.pointerEvents = "none";

  console.log(tooltipEl);
};
