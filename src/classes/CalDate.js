
// 演算用
const _sec = 1000
const _min = _sec * 60
const _hour = _min * 60
const _day = _hour * 24
const _week = _day * 7

/**
 * オレオレカレンダー演算用
 *
 * TODO 演算ベースとなる「○曜始まり」を共通コンフィグから持ってくる
 */
export default class CalDate extends Date {

  /**
	 * 何日前何時間前の表示
	 */
  toFuzzyStr () {
    let df = Date.now() - this.this

    if (df < _min * 2) {
      return 'now'
    }
    if (df < _hour) {
      return Math.ceil(df / (_min * 5), 0) * 5 + 'm'
    }
    if (df < _hour * 12) {
      return Math.ceil(df / (_hour / 2), 0) / 2 + 'h'
    }
    if (df < _day * 3) {
      return Math.round(df / (_hour * 12), 0) / 2 + 'd'
    }
    if (df < _week * 4) {
      return Math.round(df / (_week), 0) + 'w'
    }

    if (df < _day * 180) {
      return (this.getMonth() + 1) + '/' + this.getDate()
    }
    return this.getFullYear() + '/' + (this.getMonth() + 1)
  }

  getDayKnj () {
    return ['日', '月', '火', '水', '木', '金', '土'][this.getDay()]
  }
  // 蟷ｴ譛域律 yyyymmdd 8譯√〒霑斐☆
  getYmd () {
    return '' + this.getFullYear() + ('0' + (1 + this.getMonth())).substr(-2) + ('0' + this.getDate()).substr(-2)
  };

  getMnDz () {
    return '' + ('0' + (1 + this.getMonth())).substr(-2) + '/' + ('0' + this.getDate()).substr(-2)
  };

  getMnD () {
    return '' + (1 + this.getMonth()) + '/' + this.getDate()
  };

  // 譎ょ綾陦ｨ遉ｺ hh:ii 5譯�
  getHmz () {
    return '' + ('0' + (this.getHours())).substr(-2) + ':' + ('0' + this.getMinutes()).substr(-2)
  };
  // 騾ｱ縺ｮ蟋九∪繧翫�譌･
  // @todo 譛域屆譌･縺九ｉconf謖�ｮ壹�譖懈律縺ｫ
  getWkStart () {
    var stW = (this.getDay() + 6) % 7
    return new Date(this.getTime() - stW * _day)
  }

  // weekID 窶ｻ縺ｨ縺ｩ縺ｮ騾ｱ髢謎ｺ亥ｮ壹↓縺､縺代ｋID
  getWkId (def) {
    def = def || 0
    var SDay = new Date(this.wkStart().getTime() + def * _week)
    return 'W' + this.getFullYear() + ('0' + (1 + SDay.getMonth())).substr(-2) + ('0' + SDay.getDate()).substr(-2)
  }

	getWkInfo = function (def) {
	  def = (typeof def !== 'undefined') ? def : 0
	  var sDay = new Date(this.wkStart().getTime() + def * _week)
	  var eDay = new Date(sDay.getTime() + 6 * _day)

	  // 豌ｴ譖懊�謇螻槫愛螳�
	  var midDay = new Date(sDay.getTime() + 2 * _day)
	  if (midDay.getMonth() == sDay.getMonth()) {
	    var x = Math.floor(sDay.getDate() / 7) + 1
	    lbl = (sDay.getMonth() + 1) + '月' + x + '週'
	  } else {
	    lbl = (midDay.getMonth() + 1) + '月1週'
	  }

	  return {
	    'start': sDay,
	    'end': eDay,
	    'wkID': sDay.getWkId(),
	    'label': lbl
	  }
	}
}

// function is(test){
//   return (typeof test =='undefined'|| test==='' || test===false)? false: true;
// }

// Date.prototype.gengou_table = [{
//   date : new Date(1989, 1 - 1, 8),
//   alp : 'H',
//   knj : "蟷ｳ謌�"
// }, {
//   date : new Date(1926, 12 - 1, 25),
//   alp : 'S',
//   knj : "譏ｭ蜥�"
// }, {
//   date : new Date(1912, 7 - 1, 30),
//   alp : 'T',
//   knj : "螟ｧ豁｣"
// }, {
//   date : new Date(1868, 9 - 1, 8),
//   alp : 'M',
//   knj : "譏取ｲｻ"
// }];
// Date.prototype.getGengoY = function(chk) {
//   var ret = '';
//   $(this.gengou_table).each(function(i, dt) {

//     if (chk.getTime() >= dt.date.getTime()) {
//       yy = chk.getFullYear() - dt.date.getFullYear() + 1;
//       ret = dt.alp + yy;
//       return false;
//     }
//   });
//   return (ret) ? ret : chk.getFullYear();
// };

// ----------------------------
// var CAL= {
// 	'init': function($li, st) {
// 		var dt= new Date();
// 		var mn= '';
// 		$('.date', $li).each(function(i, spn) {
// 			$VW= $(spn);
// 			$VW.html("");

// 			var dt2= new Date();
// 			// @todo 譛域屆蟋九∪繧�
// 			dt2.setDate(dt.getDate()+ i-dt.getDay());
// 			var $dt = $('<b>'+dt2.getDate()+'</b>').addClass('wd'+ dt2.getDay());
// 			$VW.append($dt).removeClass('tdy');
// 			if(dt.getDate() == dt2.getDate()){
// 				$VW.addClass("tdy");
// 			}

// 			var mntx= (mn!= dt2.getMonth()) ? dt2.getMonth()+ 1 : '';
// 			if(mntx!=mn){
// 				$VW.append('<i>'+mntx+'</i>');
// 			}
// 			mn= dt2.getMonth();
// 		});
// 	}
// };
