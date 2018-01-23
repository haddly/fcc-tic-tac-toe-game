var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

ns_and_cs = function () {
  var cross = "<i id='cross' " + "class='fa fa-times' " + "  aria-hidden='true'></i>";
  var nought = "<i id='nought' " + "class='fa fa-genderless' " + "aria-hidden='true'></i>";
  var poss_rows = [["a", "b", "c"], ["a", "e", "i"], ["a", "d", "g"], ["b", "e", "h"], ["c", "e", "g"], ["c", "f", "i"], ["d", "e", "f"], ["g", "h", "i"]],
      corner_squares = ["a", "c", "g", "i"],
      stop_player_winning = "",
      comp_wins_next_move = "",
      len = 8,
      game_can_start = false,
      array_count = [],
      clicked_squares = "",
      a_to_i = "eacgibdfh",
      n_or_c = "",
      you_are_n_or_c = "";

  function you_start() {
    n_or_c = cross;
    you_are_n_or_c = "c";
    reset_game_settings();
  }
  function reset_game_settings() {
    $("table").css("opacity", "1");
    $("td").html("");
    $("td").css("background-color", "white");
    $("td.all_ids").click(true);
    rows_copy = Array.from(poss_rows);
    clicked_squares = "";
    square_id = "";
    array_count = [0, 0, 0, 0, 0, 0, 0, 0];
    game_can_start = true;
    a_to_i = "eacgibdfh";
  }

  function comp_starts() {
    reset_game_settings();
    n_or_c = cross;
    you_are_n_or_c = "n";
    setTimeout(comp_move(), 650);
  }

  function possible_letters(val) {
    a_to_i = a_to_i.replace(val, "");
  }

  function tic_tac_toe(id_number) {
    if (!player_has_chosen()) {
      return;
    }
    if (square_already_clicked(id_number)) {
      return;
    }
    clicked_squares += id_number;
    document.getElementById(id_number).innerHTML = n_or_c;
    game_can_start = false;
    update_rows(id_number);
    possible_letters(id_number);
    console.log("a_to_i_list = " + a_to_i);
    if (array_count.indexOf(3) > -1) {
      you_win();
      game_over();
    } else {
      check_for_draw();
      change_n_or_c();
      setTimeout(comp_move, 650);
    }
  }
  function change_n_or_c() {
    return n_or_c === cross ? n_or_c = nought : n_or_c = cross;
  }
  function square_already_clicked(val) {
    //return clicked_squares.match(val) !== -1 ? false : true;
    return a_to_i.match(val) === null ? true : false;
  }

  function you_win() {
    var youve_won = poss_rows[array_count.indexOf(3)];
    for (var i = 0; i < 3; i++) {
      document.getElementById(youve_won[i]).style.backgroundColor = "blue";
    }
  }

  function comp_wins() {
    var comp_wins_game = poss_rows[array_count.indexOf(-3)];
    for (var i = 0; i < 3; i++) {
      document.getElementById(comp_wins_game[i]).style.backgroundColor = "green";
    }
  }

  function update_rows(val) {
    for (var i = 0; i < len; i++) {
      if (rows_copy[i].includes(val)) {
        array_count[i]++;
      }
    }
    rows_copy = rows_copy.map(function (a) {
      return a.filter(function (b) {
        return b !== val;
      });
    });
  }

  function update_rows_comp(value) {
    var val = value;
    if ((typeof val === "undefined" ? "undefined" : _typeof(val)) === "object") {
      val = val.join("");
      console.log("joined val = " + val);
    }
    for (var i = 0; i < 8; i++) {
      if (rows_copy[i].includes(val)) {
        array_count[i]--;
      }
    }
    // document.getElementById(val).onclick = function() { this.disabled = true; }
    rows_copy = rows_copy.map(function (c) {
      return c.filter(function (d) {
        return d !== val;
      });
    });
  }

  function check_for_draw() {
    if (a_to_i.length === 0) {
      game_over();
    }
  }

  function comp_move() {
    var comp_wins_next_move = void 0,
        stop_player_winning = void 0,
        comp_next_mv = void 0;
    comp_wins_next_move = check_if_comp_one_away_from_winning();
    if (comp_wins_next_move) {
      comp_wins_next_move = comp_wins_next_move.length > 3 ? comp_wins_next_move[0] : comp_wins_next_move;
      square_id = comp_wins_next_move;
      document.getElementById(square_id).innerHTML = n_or_c;
      update_rows_comp(square_id);
      comp_wins();
      game_over();
      return;
    }
    stop_player_winning = check_if_player_one_away_from_winning();
    console.log("before change " + stop_player_winning);
    if (stop_player_winning) {
      square_id = stop_player_winning;
      clicked_squares += square_id;
      document.getElementById(square_id).innerHTML = n_or_c;
      possible_letters(square_id);
      check_for_draw();
      update_rows_comp(stop_player_winning);
      game_can_start = true;
      change_n_or_c();
      return;
    }
    if (clicked_squares.length === 0) {
      var corners = "acgi";
      corners = corners[Math.floor(Math.random() * corners.length)];
      document.getElementById(corners).innerHTML = n_or_c;
      possible_letters(corners);
      check_for_draw();
      update_rows_comp(corners);
      game_can_start = true;
      change_n_or_c();
      return;
    }
    //   if (a_to_i.match("e") !== null && a_to_i.length === 8){
    //     comp_next_mv = "e";
    //   }
    else {
        //    comp_next_mv = a_to_i[Math.floor(Math.random() * a_to_i.length)];
        comp_next_mv = comp_semi_random_next_move();
      }
    document.getElementById(comp_next_mv).innerHTML = n_or_c;
    possible_letters(comp_next_mv);
    check_for_draw();
    update_rows_comp(comp_next_mv);
    game_can_start = true;
    change_n_or_c();
    return;
  }
  function comp_semi_random_next_move() {
    var val = void 0,
        len = a_to_i.length;
    if (a_to_i.match("e") !== null && len === 8) {
      val = "e";
    }
    if (len === 7 || len === 8) {
      val = a_to_i[Math.floor(Math.random() * a_to_i.length)];
    } else {
      val = a_to_i[0];
    }
    return val;
  }

  function array_count_minus_one() {
    var minus = "",
        check_minus_one = void 0;
    check_minus_one = function check_minus_one() {
      return array_count.map(function (a) {
        return a === -1 ? minus += a : minus = minus;
      });
    };
  }

  function check_array_count() {
    return array_count.every(function (a) {
      return a > -2 && a < 2;
    });
  }

  function comp_next_move() {
    var next_move = "",
        corners_and_sides = "abcdfghi",
        i = 0,
        len = corners_and_sides.length,
        count_ = void 0,
        count = 0,
        two = [],
        minus_one = [];
    if (clicked_squares.match("e") === null) {
      return next_move = "e";
    }

    for (var _i = 0; _i < 4; _i++) {
      if (clicked_squares.match(corners_and_sides[_i]) !== null) {
        next_move += corners_and_sides[_i];
      }
    }

    return next_move[Math.floor(Math.random() * next_move.length + 0)];
    console.log("next move = " + next_move);
  }

  function check_if_player_one_away_from_winning() {
    var answer = [];
    for (var i = 0; i < 8; i++) {
      if (array_count[i] === 2) {
        answer.push(rows_copy[i]);
      }
    }
    // if answer has more that one then make it random which is chosen
    return answer.length === 1 ? answer : answer[Math.floor(Math.random() * answer.length + 0)];
  }

  function check_if_comp_one_away_from_winning() {
    var answer_ = void 0;
    for (var i = 0; i < 8; i++) {
      if (array_count[i] === -2) {
        return rows_copy[i];
      }
    }
  }

  function player_has_chosen() {
    return game_can_start ? true : false;
  }

  function reset_game() {
    game_can_start = false;
  }

  function game_over() {
    $("table").css("opacity", "0.3");
    game_can_start = false;
    rows_copy = [];
    if (you_are_n_or_c === "c") {
      return setTimeout(you_start, 1300);
    } else {
      return setTimeout(comp_starts, 1300);
    }
  }
  return {
    tic_tac_toe: tic_tac_toe,
    you_start: you_start,
    comp_starts: comp_starts
  };
}();