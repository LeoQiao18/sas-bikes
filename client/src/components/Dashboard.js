import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card } from 'antd';
import DeleteBikeButton from './DeleteBikeButton';
import './Dashboard.css';

class Dashboard extends React.Component {
  renderContent() {
    const { bikes } = this.props;
    const colGrid = {
      lg: 8,
      md: 12,
      sm: 24
    };
    if (!bikes) {
      return (
        <Col className="bike-card">
          <Card loading bordered={false}>
            Card content
          </Card>
        </Col>
      );
    } else if (!bikes.length) {
      return (
        <Col className="bike-card">
          <Card bordered={false} title="No Bikes">
            Register your bike right now!!!
          </Card>
        </Col>
      );
    } else {
      return this.props.bikes.map(bike => {
        return (
          <Col
            {...colGrid}
            className="bike-card"
            key={bike.cloudinary_public_id}
          >
            <Card bodyStyle={{ padding: 0 }}>
              <div className="bike-card__image">
                <img alt="" width="100%" src={bike.image_url} />
              </div>
              <div className="bike-card__content">
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
              <div className="bike-card__buttons">
                <DeleteBikeButton bikeId={bike._id} />
              </div>
            </Card>
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
