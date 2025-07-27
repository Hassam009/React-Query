// components/SignupForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { SignupSchema } from "../schema/SignupSchema";
import type { z } from "zod";
type SignupFormValues = z.input<typeof SignupSchema>;

import type { SubmitHandler } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit: SubmitHandler<SignupFormValues> = (data) => {
    console.log("Form Submitted ✅", data);
  };
 const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h5" align="center">
          Sign Up
        </Typography>

        <TextField
          label="Name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="Username"
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        <TextField
          label="Email"
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Phone Number"
          {...register("phone")}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />

        <TextField
          label="Age"
          type="number"
          {...register("age", { valueAsNumber: true })}
          error={!!errors.age}
          helperText={errors.age?.message}
        />

        <TextField
          label="Website (optional)"
          {...register("website")}
          error={!!errors.website}
          helperText={errors.website?.message}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Confirm Password"
          type={showConfirm ? "text" : "password"}
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirm((prev) => !prev)}>
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </Button>
      </Box>
    </Container>
  );
}
