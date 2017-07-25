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
    const options = {
      legend: {
        display: false
      }
    }
    console.log(this.props.data.icons)

    return (
      <Paper style={styles.paper}>
        <span style={GlobalStyles.title}>{this.props.title}</span>

        <div style={GlobalStyles.clear}/>

        <div className="row">

          <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
            <div style={styles.pieChartDiv}>
              <Doughnut data={this.props.data}
                options={options}/>
            </div>
          </div>

          <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
            <div style={styles.legend}>
              <div style={styles.legend}>
                <List>
                  {this.props.data.labels.map((item, i) =>
                    <ListItem
                      key={item}
                      leftAvatar={
                        <Avatar icon={this.props.data.icons[i]}
                                backgroundColor={this.props.data.datasets[0].backgroundColor[i]}/>
                      }
                      onTouchTap={this.props.filterItem.bind(this, item)}>
                      {item} ({this.props.data.datasets[0].data[i]})
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
