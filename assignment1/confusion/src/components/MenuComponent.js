import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';


class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedDish: null,
      selectedComments: null
    };
  }
  onDishSelect(dish) {
      this.setState({ selectedDish: dish});
      this.setState({ selectedComments: dish.comments});
  }

  renderDish(dish) {
      if (dish != null)
          return(
              <Card>
                  <CardImg top src={dish.image} alt={dish.name} />
                  <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
              </Card>
          );
      else
          return(
              <div></div>
          );
  }

//
renderDishComment(comments) {
    if (comments == null) {
      return (
        <div></div>
      );
    }
    const cmt = comments.map( (comment) => {
      return(
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>--{comment.author}, &nbsp;
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
          }).format(new Date(comment.date))}
          </p>
        </li>
      );
    });
    return (
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {cmt}
        </ul>
      </div>
    );
}
// //


  render() {
    const menu = this.props.dishes.map( (dish) => {
      return (
        <div  className="col-12 col-md-5 m-1">
           <Card key={dish.id}
             onClick={() => this.onDishSelect(dish)}>
             <CardImg width="100%" src={dish.image} alt={dish.name} />
             <CardImgOverlay>
                 <CardTitle>{dish.name}</CardTitle>
             </CardImgOverlay>
           </Card>
         </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
            {menu}
        </div>
        <div className="row">
          <div  className="col-12 col-md-5 m-1">
            {this.renderDish(this.state.selectedDish)}
          </div>
          <div  className="col-12 col-md-5 m-1">
            {this.renderDishComment(this.state.selectedComments)}
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
