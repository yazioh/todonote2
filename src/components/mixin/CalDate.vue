<script>
/**
 * カレンダー関連の便利関数 予定地
 * ？？ あとでDate派生クラスで実装するかも？
 */
export default {
  template: `<!-- -->`,

  methods: {
    Ymd: function(d) {
      let dt = d ? d : new Date();
      return [
        dt.getFullYear(),
        ("00" + (dt.getMonth() + 1)).slice(-2),
        ("00" + dt.getDate()).slice(-2)
      ].join("");
    }
  }
};
</script>
