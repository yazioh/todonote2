<script>
/**
 * 4象限表示の色と意味を統一する
 *
 */

/**
 * Area class ..TODO class化検討
 */
function _area(name, color, title, iconName) {
  return {
    name: name,
    title: title,
    color: "bgc-" + color,
    icon: iconName
  };
}
const AREAs = {
  a1: _area("a1", "area1", "至急重要", "exclamation-triangle"),
  a2: _area("a2", "area2", "急ぎ", "rocket"),
  a3: _area("a3", "area3", "重要", "key"),
  a4: _area("a4", "area4", "不要不急", "coffee")
};
console.log("AREAs ready");

export default {
  template: "<!-- nothing -->",
  computed: {
    areas: function() {
      return AREAs;
    }
  },

  methods: {
    areaLabel: function(name) {
      return AREAs[name] ? AREAs[name].title : "";
    },

    areaIconName: function(name) {
      return AREAs[name] ? AREAs[name].icon : "";
    },

    areaColor: function(name) {
      if (!AREAs[name]) {
        console.log("no color ", name);
      }
      return AREAs[name] ? AREAs[name].color : "";
    }
  }
};
</script>
