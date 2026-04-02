import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Stack,
  Box,
  Chip,
} from "@mui/material";
import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: number | string;
  color?: "success" | "warning" | "error" | "primary";
  icon?: ReactNode;
  hint?: string;
  onClick?: () => void;
};

export const StatCard = ({
  title,
  value,
  color = "primary",
  icon,
  hint,
  onClick,
}: StatCardProps) => {
  return (
    <Card elevation={3} sx={{ borderRadius: 3, width: 1, height: 1 }}>
      <CardActionArea onClick={onClick} sx={{ p: 1 }}>
        <CardContent>
          <Stack spacing={1}>
            {/* Top row */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                {title}
              </Typography>
              {icon && <Box>{icon}</Box>}
            </Stack>

            {/* Main value */}
            <Typography variant="h4" fontWeight={600}>
              {value}
            </Typography>

            {/* Optional hint */}
            {hint && (
              <Chip
                label={hint}
                size="small"
                color={color}
                variant="outlined"
                sx={{ width: "fit-content" }}
              />
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};