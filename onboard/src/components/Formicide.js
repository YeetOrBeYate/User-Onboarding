import React, {useState,useEffect} from "react";
import axios from "axios";
import {Form,Field,withFormik} from "formik";
import * as Yup from "yup";

const Formicide = ({ values, touched, errors, status })=>{

    const [user, setUser] = useState([]);

    useEffect(()=>{
        status && setUser(user=>[...user, status]);
    },[status])

    return(
        <div>
            <Form className = "formy">
                <Field className="inputs" type="text" name="name" placeholder="enter your name"/>
                {touched.name && errors.name &&  <p className="error">{errors.name}</p>}
               
                <Field className="inputs" type="email" name="email" placeholder="Enter your email"/>
                {touched.email && errors.email && <p className="error">{errors.email}</p>}
                
                <Field className="inputs" type="password" name="password" placeholder="Enter your password"/>
                {touched.password && errors.password &&<p className ="error">{errors.password}</p> }
                <label>
                    Term of Service:
                    <Field className="inputs" type="checkbox" name="terms" checked={values.terms}/>
                </label>
                
                <button type="submit">Submit</button>
            </Form>

            {user.map((use,index) => (
                <ul key={index}>
                <li>Name: {use.name}</li>
                <li>Email: {use.email}</li>
                <li>password: {use.password}</li>
                </ul>
            ))}

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
    name: Yup.string()
    .required("please enter a name")
    .test('len', 'must be longer than 1 character', val => val.length > 1),
    email: Yup.string().required("please enter an email"),
    password: Yup.string()
    .required("Please enter a password")
    .test('len', 'Your password must be at least 8 characters', val => val.length >7)
  }),

  handleSubmit(values,{setStatus}){
      axios

      .post("https://reqres.in/api/users", values)
      .then((res)=>{
          console.log(res)
          setStatus(res.data);
          
      })
      .catch((err)=> console.log(err.response));
  }

})(Formicide)


export default Formikcide;