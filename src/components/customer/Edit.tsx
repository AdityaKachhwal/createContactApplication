import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import axios from "axios";

export interface ContactValues {
  [key: string]: any;
}

export interface ContactFormState {
  id: number;
  customer: any;
  headers: any;
  checked: boolean;
  values: ContactValues[];
  isActive: boolean;
  submitSuccess: boolean;
  loading: boolean;
}

class EditCustomer extends React.Component<
  RouteComponentProps<any>,
  ContactFormState
> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      customer: {},
      headers: {},
      checked: false,
      isActive: true,
      values: [],
      loading: false,
      submitSuccess: false,
    };
  }

  public componentDidMount(): void {
    axios
      .get(`http://localhost:9000/customers/${this.state.id}`, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((data) => {
        this.setState({ customer: data.data });
      });
  }

  private processFormSubmission = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    this.setState({ loading: true });
    let allvalue = this.state.values;
    axios
      .put(
        `http://localhost:9000/customers/${this.state.id}`,

        this.state.values
      )
      .then((data) => {
        this.setState({ submitSuccess: true, loading: false });
        setTimeout(() => {
          this.props.history.push("/");
        }, 1500);
      });
  };

  private setValues = (values: ContactValues) => {
    this.setState({ values: { ...this.state.values, ...values } });
  };
  handleCheckClick = () => {
    this.setState({ checked: !this.state.checked });
  };

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setValues({
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  public render() {
    const { submitSuccess, loading } = this.state;
    return (
      <div className="App">
        {this.state.customer && (
          <div>
            <h1> contact Crud operations App</h1>

            <div>
              <div className={"col-md-12 form-wrapper"}>
                <h2> Edit contact </h2>

                {submitSuccess && (
                  <div className="alert alert-info" role="alert">
                    contact details has been edited successfully{" "}
                  </div>
                )}

                <form
                  id={"create-post-form"}
                  onSubmit={this.processFormSubmission}
                  noValidate={true}
                >
                  <div className="form-group col-md-12">
                    <label htmlFor="firstName"> First Name </label>
                    <input
                      type="text"
                      id="firstName"
                      defaultValue={this.state.customer.firstName}
                      onChange={(e) => this.handleInputChanges(e)}
                      name="firstName"
                      className="form-control"
                      placeholder="Enter customer's first name"
                    />
                  </div>

                  <div className="form-group col-md-12">
                    <label htmlFor="lastName"> Last Name </label>
                    <input
                      type="text"
                      id="lastName"
                      defaultValue={this.state.customer.lastName}
                      onChange={(e) => this.handleInputChanges(e)}
                      name="lastName"
                      className="form-control"
                      placeholder="Enter customer's last name"
                    />
                  </div>

                  <div className="form-group col-md-12">
                    <label htmlFor="email"> Email </label>
                    <input
                      type="email"
                      id="email"
                      defaultValue={this.state.customer.email}
                      onChange={(e) => this.handleInputChanges(e)}
                      name="email"
                      className="form-control"
                      placeholder="Enter customer's email address"
                    />
                  </div>

                  <div className="form-group col-md-12">
                    <label htmlFor="phone"> Phone </label>
                    <input
                      type="text"
                      id="phone"
                      defaultValue={this.state.customer.phoneNumber}
                      onChange={(e) => this.handleInputChanges(e)}
                      name="phone"
                      className="form-control"
                      placeholder="Enter customer's phone number"
                    />
                  </div>
                  {/* 
                  <div className="form-group col-md-12">
                    <label htmlFor="status"> Status </label>
                    <input
                      type="text"
                      id="isActive"
                      defaultValue={this.state.customer.status}
                      onChange={(e) => this.handleInputChanges(e)}
                      name="isActive"
                      className="form-control"
                      placeholder="Enter Status"
                    />
                  </div> */}
                  <div>
                    <label>
                      Status
                      <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        defaultValue={this.state.customer.status}
                        checked={this.state.customer.status}
                        onChange={this.handleCheckClick}
                        className="form-control"
                      />
                    </label>
                  </div>

                  <div className="form-group col-md-4 pull-right">
                    <button className="btn btn-success" type="submit">
                      Edit Customer{" "}
                    </button>
                    {loading && (
                      <span className="fa fa-circle-o-notch fa-spin" />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(EditCustomer);
