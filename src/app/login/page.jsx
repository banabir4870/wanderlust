"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { Card } from '@heroui/react';
import Link from "next/link";
import { redirect } from "next/navigation";
import React from 'react';
import { FaGoogle } from "react-icons/fa";

const LogInPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const userData = Object.fromEntries(formData.entries())

        const { data, error } = await authClient.signIn.email({
            email: userData.email,
            password: userData.password,
            callbackURL: '/'
        })

        if (data) {
            alert('LogIn Successfully.')
        }
        if (error) {
            alert(`${error.message}`)
        }
    };

    const handleGoogleLogin = async () =>{
        const data = await authClient.signIn.social({
            provider: 'google',
        })
    }
    return (
        <div className="w-1/4 mx-auto my-6">
            <div className="text-center my-4">
                <h1 className="text-5xl font-semibold">Welcome Back</h1>
                <p>Resume your adventure with Wanderlust</p>
            </div>
            <Card className="border rounded-none">
                <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email Address</Label>
                        <Input placeholder="Enter Your Email Address" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Create A Password" />
                        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                        <FieldError />
                    </TextField>
                    <div className="flex gap-2">
                        <Button type="submit" className={'w-full rounded-none'}>
                            Sign In
                        </Button>
                    </div>
                    <div className="flex items-center gap-3">
                        <hr className="flex-1 border-gray-300" />

                        <span className="text-sm text-gray-500">Or Continue With</span>

                        <hr className="flex-1 border-gray-300" />
                    </div>
                    <Button onClick={handleGoogleLogin} variant="outline" className={'flex items-center rounded-none w-full'}><FaGoogle /> Log In With Google</Button>
                    <p className="text-center">Don&apos;t Have An Account? <Link href={'/signup'} className="text-blue-500">Sign Up</Link></p>
                </Form>
            </Card>
        </div>
    );
};

export default LogInPage;