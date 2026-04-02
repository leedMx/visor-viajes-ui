import { Card, CardContent, Stack, Typography, Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { ReactNode } from "react";

export type DonutDatum = {
  id: string | number;
  label: string;
  value: number;
  color?: string;
};

type DonutStatCardProps = {
  title: string;
  data: DonutDatum[];
  height?: number;
  icon?: ReactNode;
  subtitle?: string;
  centerLabel?: string;
  onClick?: () => void;
};

export const DonutStatCard = ({
  title,
  data,
  height = 220,
  icon,
  subtitle,
  centerLabel,
  onClick,
}: DonutStatCardProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const mainLabel = centerLabel ?? String(total);

  return (
    <Card
      elevation={3}
      sx={{ borderRadius: 3, height: "100%", cursor: onClick ? "pointer" : "default" }}
      onClick={onClick}
    >
      <CardContent sx={{ height: "100%" }}>
        <Stack spacing={1} sx={{ height: "100%" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            {icon && <Box>{icon}</Box>}
          </Stack>

          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}

          <Box sx={{ position: "relative", height }}>
            <PieChart
              height={height}
              margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
              slotProps={{
                legend: {
                //   direction: "column",
                  position: { vertical: "middle",
                    //  horizontal: "right"
                     },
                //   padding: 0,
                },
              }}
              series={[
                {
                  data,
                  innerRadius: 58,
                  outerRadius: 90,
                  paddingAngle: 2,
                  cornerRadius: 4,
                  cx: 90,
                  cy: height / 2,
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: { innerRadius: 54, additionalRadius: -6, color: "gray" },
                },
              ]}
            />

            <Box
              sx={{
                position: "absolute",
                left: 90,
                top: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                pointerEvents: "none",
              }}
            >
              <Typography variant="h5" fontWeight={700} lineHeight={1}>
                {mainLabel}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                total
              </Typography>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};