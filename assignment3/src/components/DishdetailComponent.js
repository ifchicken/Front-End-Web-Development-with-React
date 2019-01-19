import React, {Component} from 'react';
// import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,
    Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Button, Col, Row } from 'reactstrap';

import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


  function RenderDish({dish}) {
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
  function RenderDishComment({comments}) {
    // comments is a array
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

  const DishDetail = (props) => {
      const dish = props.dish
      if (dish == null) {
          return (<div></div>)
      }

      return (
        <div class="container">
          <div className="row">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>
          </div>

          <div className="row">
            <div  className="col-12 col-md-5 m-1">
              <RenderDish dish={props.dish}/>
            </div>
            <div  className="col-12 col-md-5 m-1">
            <RenderDishComment comments={props.comments}/>
            <Comment/>
            </div>
          </div>
        </div>
      )
  }


  const required = (val) => val && val.length;
  const maxLength = (len) => (val) => !(val) || (val.length <= len);
  // const minLength = (len) => (val) => val && (val.length >= len);
  const minLength = (len) => (val2) => val2 && (val2.length >= len);




  class Comment extends Component {

    constructor(props) {
        super(props);

        this.state = {
          isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }

      handleSubmit(values) {

          console.log('Current State is: ' + JSON.stringify(values));
          alert('Current State is: ' + JSON.stringify(values));
          this.toggleModal();
      }

    render() {
      return (
        <>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>

         <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
             <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
             <ModalBody>
                <div className="col-12">
               <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                   <Row className="form-group">
                     <Col md={12}>
                       <Label htmlFor="rating">Rating</Label>
                     </Col>
                     <Col>
                       <Control.select model=".rating" name="rating"
                               className="form-control">
                           <option>1</option>
                           <option>2</option>
                           <option>3</option>
                           <option>4</option>
                           <option>5</option>
                       </Control.select>
                     </Col>
                   </Row>

                   <Row className="form-group">
                       <Col md={12}>
                         <Label htmlFor="authoer">Your Name</Label>
                       </Col>
                       <Col>
                         <Control.text model=".authoer" id="authoer" name="authoer"
                           placeholder="Your Name" className="form-control"
                           validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}
                           />
                           <Errors
                               className="text-danger"
                               model=".authoer"
                               show="touched"
                               messages={{
                                   required: 'Required',
                                   minLength: 'Must be greater than 2 characters',
                                   maxLength: 'Must be 15 characters or less'
                               }}
                            />
                       </Col>
                   </Row>

                   <Row className="form-group">
                        <Col md={12}>
                          <Label htmlFor="comment" >Comment</Label>
                        </Col>
                        <Col md={12}>
                          <Control.textarea model=".comment" id="comment"
                            name="comment" rows="6" className="form-control"/>
                        </Col>
                   </Row>

                   <Button type="submit" value="submit" color="primary">Submit</Button>
               </LocalForm>
               </div>
             </ModalBody>
         </Modal>

        </>
      );
    }
  }




export default DishDetail
