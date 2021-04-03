<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'presale.chart.presale.dashboard.views.components',
  extends: Line,
  props: {
    chartData: Object,
    options: Object
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>