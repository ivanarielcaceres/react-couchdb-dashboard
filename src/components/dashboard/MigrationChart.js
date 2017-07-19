import React from 'react';
import Paper from 'material-ui/Paper';
import {PieChart, Pie, Cell, ResponsiveContainer, Tooltip} from 'recharts';
import {Doughnut} from 'react-chartjs-2';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import GlobalStyles from '../../styles';

class MigrationChart extends React.Component {

  constructor(props) {
    super(props);
  }

  onListItemSelected(item) {
    console.log(`item pressed ${item}`);
  }

  render() {
      const styles = {
        paper: {
          minHeight: 344,
          padding: 10
        },
        legend: {
          paddingTop: 20,
        },
        pieChartDiv: {
          height: 290,
          textAlign: 'center'
        }
      };
      return (
        <Paper style={styles.paper}>
          <span style={GlobalStyles.title}>{this.props.title}</span>

          <div style={GlobalStyles.clear}/>

          <div className="row">

            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
              <div style={styles.pieChartDiv}>
                  <Doughnut data={this.props.data} />
              </div>
            </div>

            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <div style={styles.legend}>
                <div style={styles.legend}>
                  <List>
                    {this.props.data.labels.map((item) =>
                      <ListItem
                        key={item}>
                        {item}
                      </ListItem>
                    )}
                  </List>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      );
    }
}

export default MigrationChart;
