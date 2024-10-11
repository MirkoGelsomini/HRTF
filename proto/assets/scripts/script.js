var chkbox;

$(document).ready(function () {
  Ready();
});

function Ready() {
  generateList("scans");
  generateList("pointclouds");
  generateList("meshmodels");
  generateList("hrtfs");

  chkbox = {
    pointCloud: $("#3dPointCloud"),
    flameModel: $("#3dFlameModel"),
    acoustic: $("#AcousticResponse"),
  };

  hrtfViz = $(".hrtf_viz");

  //if i click on a element with attr goto show the content with the id of the attr goto
  $("[data-goto]").on("click", function () {
    var id = $(this).attr("data-goto");
    console.log(id);

    $(".content-wrapper").hide();

    if (id.includes("new->")) {
      $("#new_").show();
      $("#newTitle").text(id.replace("new->", "").replace("_", " "));
    } else {
      $("#" + id).show();
    }
  });

  //if a checkbox is clicked
  $("input[type=checkbox]").on("click", function () {
    updateBasedOnCheckbox(this);
  });

  $(".menu-link").click(function () {
    $(".menu-link").removeClass("is-active");
    $(this).addClass("is-active");
  });

  $(".main-header-link").click(function () {
    $(".main-header-link").removeClass("is-active");
    $(this).addClass("is-active");
  });

  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdowns.forEach((c) => c.classList.remove("is-active"));
      dropdown.classList.add("is-active");
    });
  });

  $(".search-bar input")
    .focus(function () {
      $(".header").addClass("wide");
    })
    .blur(function () {
      $(".header").removeClass("wide");
    });

  $(document).click(function (e) {
    var container = $(".status-button");
    var dd = $(".dropdown");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      dd.removeClass("is-active");
    }
  });

  $(".dropdown").on("click", function (e) {
    $(".content-wrapper").addClass("overlay");
    e.stopPropagation();
  });
  $(document).on("click", function (e) {
    if ($(e.target).is(".dropdown") === false) {
      $(".content-wrapper").removeClass("overlay");
    }
  });

  $(".hrtf_viz").on("click", function (e) {
    window.alert(
      "Immagine a puro scopo illustrativo. Sarà implementata la visualizzazione interattiva/3D"
    );
  });

  /*$(".status-button:not(.open)").on("click", function (e) {
    $(".overlay-app").addClass("is-active");
  });
  $(".pop-up .close").click(function () {
    $(".overlay-app").removeClass("is-active");
  });

  $(".status-button:not(.open)").click(function () {
    $(".pop-up").addClass("visible");
  });

  $(".pop-up .close").click(function () {
    $(".pop-up").removeClass("visible");
  });*/

  const toggleButton = document.querySelector(".dark-light");

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
  });

  $("#profileTabs a").on("click", function (e) {
    e.preventDefault();
    $("#profileTabs a").removeClass("active");
    $(this).addClass("active");
    $(".listProfile").hide();
    $("#myListProfile_"+$(this).attr("data-tab")).show();
  });

  //updateBasedOnCheckbox();

  $("#profile").show();
  $(".listProfile").hide();
  $("#myListProfile_scans").show();
  $("#profileTabs a[data-tab=scans]").addClass("active");

  console.log("Ready");

  window.setTimeout(function () {
    $("#profile").show();
  }, 1000);
}

function updateBasedOnCheckbox(thiis) {
  var res = {
    is3dPointCloud: chkbox.pointCloud.is(":checked"),
    is3dFlameModel: chkbox.flameModel.is(":checked"),
    isAcoustic: chkbox.acoustic.is(":checked"),
  };

  if (thiis === undefined) {
    var changedChkBox = "3dPointCloud";
  } else {
    var changedChkBox = $(thiis).attr("id");
  }

  if (changedChkBox === "3dPointCloud") {
    //chkbox.flameModel.prop("checked", false);
    chkbox.acoustic.prop("checked", false);

    if (res.is3dPointCloud && res.is3dFlameModel) {
      hrtfViz.css(
        "background-image",
        "url('assets/images/pointCloudAndFlame.jpg')"
      );
    } else {
      hrtfViz.css("background-image", "url('assets/images/pointCloud.jpg')");
    }
  } else if (changedChkBox === "3dFlameModel") {
    //chkbox.pointCloud.prop("checked", false);
    chkbox.acoustic.prop("checked", false);

    if (res.is3dPointCloud && res.is3dFlameModel) {
      hrtfViz.css(
        "background-image",
        "url('assets/images/pointCloudAndFlame.jpg')"
      );
    } else {
      hrtfViz.css("background-image", "url('assets/images/flame.jpg')");
    }
  } else if (changedChkBox === "AcousticResponse" && res.isAcoustic) {
    chkbox.pointCloud.prop("checked", false);
    chkbox.flameModel.prop("checked", false);
    if (res.isAcoustic) {
      hrtfViz.css(
        "background-image",
        "url('assets/images/acousticResponse.jpg')"
      );
    }
  }

  //console.log(res);

  if (!res.is3dPointCloud && !res.is3dFlameModel && !res.isAcoustic) {
    hrtfViz.css("background-image", "");
    chkbox.pointCloud.prop("checked", true);
    updateBasedOnCheckbox();
  }
}

function generateList(type) {
  var nitems = randomInt(7, 13);
  var list = [];

  if (type == "scans") {
    for (var i = 0; i < nitems; i++) {
      var item = {
        title: randomName(),
        status: randomStatus(),
        date: randomDate(),
        files: randomNumber(1, 3),
        type: randomType(type),
      };
      list.push(item);
    }
  } else if (type == "pointclouds") {
    for (var i = 0; i < nitems; i++) {
      var item = {
        title: randomName(),
        status: randomStatus(),
        date: randomDate(),
        type: randomType(type),
        reference: 1,
      };
      list.push(item);
    }
  } else if (type == "meshmodels") {
    for (var i = 0; i < nitems; i++) {
      var item = {
        title: randomName(),
        status: randomStatus(),
        date: randomDate(),
        type: randomType(type),
        reference: 2,
      };
      list.push(item);
    }
  } else if (type == "hrtfs") {
    for (var i = 0; i < nitems; i++) {
      var item = {
        title: randomName(),
        status: randomStatus(),
        date: randomDate(),
        type: randomType(type),
        reference: 3,
      };
      list.push(item);
    }
  }

  //sort list by status, first completed, then processing and then to process
  list.sort(function (a, b) {
    if (a.status === "Completed" && b.status !== "Completed") {
      return -1;
    } else if (a.status === "Processing..." && b.status === "To process") {
      return 1;
    } else if (a.status === "Processing..." && b.status === "Completed") {
      return 1;
    } else if (a.status === "To process" && b.status === "Completed") {
      return 1;
    } else if (a.status === "To process" && b.status === "Processing...") {
      return -1;
    } else {
      return 0;
    }
  });

  var html = "";

  //get all keys for the first item
  if (list.length != 0) {
    var keys = Object.keys(list[0]);

    //create the header
    html += `<li class="product header">`;
    for (var key of keys) {
      html += `<div class="${key}">${
        key.charAt(0).toUpperCase() + key.slice(1)
      }</div>`;
    }
    html += `<div class="actions">Actions</div></li>`;
  }

  for (var item of list) {
    var buttonText =
      item.status === "To process"
        ? "Process"
        : item.status === "Processing..."
        ? ""
        : "View";
    var buttonClass =
      item.status === "To process"
        ? ""
        : item.status === "Processing..."
        ? "hidden"
        : "open";

    var goto = buttonClass === "open" ? "expandView_" + type : "";

    html += `<li class="product">`;

    //debugger;
    for (var index in item) {
      html += `<div class="${index}">`;
      if (index == "status") {
        html += `<span class="status-circle ${getStatusColor(
          item[index]
        )}"></span>${item[index]}`;
      } else if (index == "reference") {
        html += `<span class="reference">${randomReference(
          item[index]
        )}</span>`;
      } else {
        html += `${item[index]}`;
      }
      html += `</div>`;
    }

    html += `
      <div class="button-wrapper">
        <button class="content-button status-button ${buttonClass}" data-goto="${goto}">${buttonText}</button>
        <div class="menu">
          <button class="dropdown">
            <ul>
              <li><a href="#">Edit</a></li>
              <li><a href="#">Archive</a></li>
            </ul>
          </button>
        </div>
      </div>
    </li>`;
  }

  var listView = $("#myList_" + type);
  listView.html(html);

  var listProfileView = $("#myListProfile_" + type);
  listProfileView.html(html);

  $("#myNumber_" + type).text(nitems);
}

function randomName() {
  var names = [
    "Jane Doe",
    "John Doe",
    "John Smith",
    "Jane Smith",
    "John Johnson",
    "Jane Johnson",
  ];
  return names[Math.floor(Math.random() * names.length)];
}

function randomStatus() {
  var status = ["To process", "Processing...", "Completed"];
  return status[Math.floor(Math.random() * status.length)];
}

function randomDate() {
  var date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 10));
  return date.toLocaleDateString();
}

function randomType(type) {
  if (type == "scans") {
    var types = [
      `<span class="mdi mdi-cloud-upload-outline" title="Imported"></span>`,
      `<span class="mdi mdi-radiobox-marked" title="Acquired"></span>`,
    ];
  } else {
    var types = [
      `<span class="mdi mdi-cloud-upload-outline" title="Imported"></span>`,
      `<span class="mdi mdi-abacus" title="Processed"></span>`,
    ];
  }

  var res = types[Math.floor(Math.random() * types.length)];
  return res;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomReference(tot) {
  var html = "";
  var references = [
    `<span class="mdi mdi-face-recognition" title="Scan #${randomNumber(
      1,
      150
    )}"></span>`,
    `<span class="mdi mdi-dots-hexagon " title="Point Cloud #${randomNumber(
      1,
      150
    )}"></span>`,
    `<span class="mdi mdi-cube" title="Mesh Model #${randomNumber(
      1,
      150
    )}"></span>`,
  ];
  for (var i = 0; i < tot; i++) {
    html += `${references[i]}`;
  }
  return html;
}

function getStatusColor(status) {
  if (status === "To process") {
    return "red";
  } else if (status === "Processing...") {
    return "blue";
  } else {
    return "green";
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
