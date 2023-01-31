import { Component } from "@angular/core";
import { AppService } from "./app.service";
import { Winner } from "./interface";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Winners echart";
  fetchedData!: Winner[];
  uniqueFetchData!: Winner[];
  options: any;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.appService.getData().subscribe((res) => {
      this.fetchedData = res;
      this.getUniqueAthlets();
    });
  }

  getUniqueAthlets() {
    if(this.fetchedData) {

    this.uniqueFetchData = this.fetchedData
      .reduce((acc: Winner[], el) => {
        let index = acc.findIndex((e) => e.athlete === el.athlete);
        if (index !== -1) {
          acc[index].gold += el.gold;
          acc[index].bronze += el.bronze;
          acc[index].silver += el.silver;
        } else {
          acc.push(el);
        }
        return acc;
      }, [])
      .slice(0, 15);
    }
    this.setOptions();
  }

  setOptions() {
    this.options = {
      title: {
        text: "Medalists"
      },
      legend: {
        type: "plain",
        orient: "vertical",
        align: "right",
        right: "right"
      },
      grid: {
        left: "25%",
        top: "20%",
        right: "2%"
      },
      tooltip: {
        trigger: "axis",
        formatter: function (params: any) {
          const totalMedals =
            params[0].value.gold +
            params[0].value.silver +
            params[0].value.bronze;
          return `${params[0].name} ${params[0].value.age}y.o. ${totalMedals} medals`;
        }
      },
      dataset: {
        dimensions: ["athlete", "gold", "silver", "bronze"],
        source: this.uniqueFetchData.map((e) => {
          const { athlete, gold, silver, bronze, age } = e;
          return {
            athlete,
            gold,
            silver,
            bronze,
            age
          };
        })
      },
      yAxis: {
        type: "category",
        nameGap: 10
      },
      xAxis: {},
      series: [
        { type: "bar", stack: "total", color: "#fff200" },
        { type: "bar", stack: "total", color: "#ccc" },
        { type: "bar", stack: "total", color: "#dfa335" }
      ]
    };
  }
}
