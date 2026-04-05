import {
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
  Chip,
  Divider,
  useTheme,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import type { ReactNode } from "react";

export type DonutDatum = {
  id: string | number;
  label: string;
  value: number;
  color?: string;
};

type DonutStatCardProps = {
  title: string;
  data: DonutDatum[];
  icon?: ReactNode;
  subtitle?: string;
  centerLabel?: string;
  centerSubLabel?: string;
  onClick?: () => void;
  height?: number;
};

export const DonutExtendedCard = ({
  title,
  data,
  icon,
  subtitle,
  centerLabel,
  centerSubLabel = "total",
  onClick,
  height = 260,
}: DonutStatCardProps) => {
  const theme = useTheme();

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const mainLabel = centerLabel ?? String(total);

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 4,
        border: `1px solid ${theme.palette.divider}`,
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))"
            : "linear-gradient(180deg, #ffffff, #fbfbfc)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick
          ? {
              transform: "translateY(-2px)",
              boxShadow: theme.shadows[4],
            }
          : undefined,
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 2.25, "&:last-child": { pb: 2.25 } }}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="overline" color="text.secondary" sx={{ lineHeight: 1.2 }}>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="body2" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
            {icon && (
              <Box
                sx={{
                  display: "grid",
                  placeItems: "center",
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  bgcolor: "action.hover",
                }}
              >
                {icon}
              </Box>
            )}
          </Stack>

          <Box sx={{ position: "relative", height }}>
            <PieChart
              height={height}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
              hideLegend
              series={[
                {
                  data,
                  innerRadius: 62,
                  outerRadius: 96,
                  paddingAngle: 1.5,
                  cornerRadius: 5,
                  cx: 110,
                  cy: height / 2,
                  highlightScope: { highlight: "item", fade: "global" },
                  faded: {
                    innerRadius: 58,
                    additionalRadius: -8,
                    // color: theme.palette.action.disabledBackground,
                  },
                },
              ]}
            />

            <Box 
              sx={{
                position: "absolute",
                left: 110,
                top: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                pointerEvents: "none",
                minWidth: 90,
              }}
            >
              <Typography variant="h4" fontWeight={700} lineHeight={1}>
                {mainLabel}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {centerSubLabel}
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Stack spacing={1}>
            {data.map((item) => {
              const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;

              return (
                <Stack
                  key={item.id}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        bgcolor: item.color || "primary.main",
                        flexShrink: 0,
                      }}
                    />
                    <Typography variant="body2">{item.label}</Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      label={`${pct}%`}
                      size="small"
                      variant="outlined"
                      sx={{ minWidth: 54 }}
                    />
                    <Typography variant="body2" fontWeight={600}>
                      {item.value}
                    </Typography>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};