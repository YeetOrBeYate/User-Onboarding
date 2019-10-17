import React from "react";
import axios from "axios";
import {Form,Field,withFormik} from "formik";
import * as Yup from "yup";

const Formicide = ({ values, touched, errors, status })=>{

    return(
        <div>
            <Form className = "formy">
                <Field className="inputs" type="text" name="name" placeholder="enter your name"/>
                {touched.name && errors.name &&  <p className="error">{errors.name}</p>}
               
                <Field className="inputs" type="email" name="email" placeholder="Enter your email"/>
                {touched.email && errors.email && <p className="error">{errors.email}</p>}
                
                <Field className="inputs" type="password" name="password" placeholder="Enter your password"/>
                <label>
                    Term of Service:
                    <Field className="inputs" type="checkbox" name="terms" checked={values.terms}/>
                </label>
                
                <button type="submit">Submit</button>
            </Form>
        </div>
    );
}

const Formikcide = withFormik({

mapPropsToValues({name,email,password,terms}){
    return{
        name:name || '',
        email:email || "",
        password:password || "",
        terms: terms || false,

    }
},

validationSchema: Yup.object().shape({
    name: Yup.string().required()
  }),

})(Formicide)


export default Formikcide;