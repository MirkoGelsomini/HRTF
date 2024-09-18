var chkbox;

$(document).ready(function () {
  Ready();
});

function Ready() {
  generateList("scan");
  generateList("experiment");

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
    $("#" + id).show();
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
    window.alert("Immagine a puro scopo illustrativo. Sarà implementata la visualizzazione interattiva/3D");
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

  updateBasedOnCheckbox();

  $("#hrtf").show();

  console.log("Ready");

  window.setTimeout(function () {
    $("#hrtf").show();
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
  var nitems = randomInt(5, 10);
  var list = [];

  for (var i = 0; i < nitems; i++) {
    var item = {
      title: randomName(),
      status: randomStatus(),
      date: randomDate(),
    };
    list.push(item);
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
  for (var item of list) {
    var buttonText =
      item.status === "To process"
        ? "Process " + type
        : item.status === "Processing..."
        ? ""
        : "View";
    var buttonClass =
      item.status === "To process"
        ? ""
        : item.status === "Processing..."
        ? "hidden"
        : "open";

    html += `
    <li class="product" data-goto="hrtf">
    <div class="title">
      ${item.title}
    </div>
    <span class="status">
      <span class="status-circle ${getStatusColor(item.status)}"></span>      
      ${item.status}
    </span>
    <span class="date">    
      ${item.date}
    </span>
    <div class="button-wrapper">
      <button class="content-button status-button ${buttonClass}">${buttonText}</button>
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
