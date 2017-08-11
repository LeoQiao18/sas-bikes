import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card } from 'antd';
import './Dashboard.css';

class Dashboard extends React.Component {
  renderContent() {
    const { bikes } = this.props;
    const colGrid = {
      lg: 6,
      md: 8,
      sm: 12,
      xs: 24
    };
    if (!bikes) {
      return (
        <Col {...colGrid}>
          <Card loading title="Card title" bordered={false}>
            Card content
          </Card>
        </Col>
      );
    } else if (!bikes.length) {
      return (
        <Col {...colGrid}>
          <Card title="No Bikes">Register your bike right now!!!</Card>
        </Col>
      );
    } else {
      return this.props.bikes.map(bike => {
        return (
          <Col {...colGrid} key={bike.cloudinary_public_id}>
            <div className="bike-image">
              <img alt="" width="100%" src={bike.image_url} />
            </div>
            <div className="bike-card">
              <h3>{`${bike.owner.firstName} ${bike.owner.lastName}`}</h3>
              <p>
                Brand: {bike.brand}
              </p>
              <p>
                Color: {bike.color}
              </p>
              {!!bike.description.length
                ? <p>
                    {bike.description}
                  </p>
                : null}
            </div>
          </Col>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <Row gutter={16}>
          {this.renderContent()}
        </Row>
      </div>
    );
  }
}

function mapStateToProps({ bikes }) {
  return { bikes };
}

export default connect(mapStateToProps)(Dashboard);
