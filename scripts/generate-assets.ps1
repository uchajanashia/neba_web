$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

function RectF($x, $y, $w, $h) {
  return [System.Drawing.RectangleF]::new([single]$x, [single]$y, [single]$w, [single]$h)
}

function Rect($x, $y, $w, $h) {
  return [System.Drawing.Rectangle]::new([int]$x, [int]$y, [int]$w, [int]$h)
}

function PtF($x, $y) {
  return [System.Drawing.PointF]::new([single]$x, [single]$y)
}

function New-RoundRectPath($x, $y, $w, $h, $r) {
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $d = $r * 2
  $path.AddArc([single]$x, [single]$y, [single]$d, [single]$d, 180, 90)
  $path.AddArc([single]($x + $w - $d), [single]$y, [single]$d, [single]$d, 270, 90)
  $path.AddArc([single]($x + $w - $d), [single]($y + $h - $d), [single]$d, [single]$d, 0, 90)
  $path.AddArc([single]$x, [single]($y + $h - $d), [single]$d, [single]$d, 90, 90)
  $path.CloseFigure()
  return $path
}

function Add-Stone($g, $w, $h, $rng) {
  $bg = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    (Rect 0 0 $w $h),
    [System.Drawing.Color]::FromArgb(255, 17, 18, 17),
    [System.Drawing.Color]::FromArgb(255, 43, 43, 39),
    32
  )
  $g.FillRectangle($bg, 0, 0, $w, $h)
  $bg.Dispose()

  for ($i = 0; $i -lt 650; $i++) {
    $alpha = $rng.Next(10, 34)
    $shade = $rng.Next(70, 170)
    $pen = [System.Drawing.Pen]::new(
      [System.Drawing.Color]::FromArgb($alpha, $shade, $shade, $shade),
      $rng.Next(1, 3)
    )
    $x1 = $rng.Next(0, $w)
    $y1 = $rng.Next(0, $h)
    $x2 = [Math]::Min($w, [Math]::Max(0, $x1 + $rng.Next(-80, 80)))
    $y2 = [Math]::Min($h, [Math]::Max(0, $y1 + $rng.Next(-18, 18)))
    $g.DrawLine($pen, $x1, $y1, $x2, $y2)
    $pen.Dispose()
  }

  for ($i = 0; $i -lt 16; $i++) {
    $pen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(34, 210, 207, 190), 1)
    $x = $rng.Next(0, $w)
    $y = $rng.Next(0, $h)
    $g.DrawBezier(
      $pen,
      $x,
      $y,
      $x + $rng.Next(-120, 120),
      $y + $rng.Next(20, 160),
      $x + $rng.Next(-180, 180),
      $y + $rng.Next(100, 260),
      $x + $rng.Next(-120, 120),
      $y + $rng.Next(200, 380)
    )
    $pen.Dispose()
  }
}

function Add-Strap($g, $w, $h, $material, $angle, $scale) {
  $state = $g.Save()
  $g.TranslateTransform([single]($w / 2), [single]($h / 2))
  $g.RotateTransform([single]$angle)
  $strapColor = if ($material -eq 'rubber') {
    [System.Drawing.Color]::FromArgb(255, 11, 12, 12)
  } else {
    [System.Drawing.Color]::FromArgb(255, 78, 47, 31)
  }
  $strapHi = if ($material -eq 'rubber') {
    [System.Drawing.Color]::FromArgb(110, 92, 99, 94)
  } else {
    [System.Drawing.Color]::FromArgb(120, 154, 96, 57)
  }
  $strapBrush = [System.Drawing.SolidBrush]::new($strapColor)
  $path = New-RoundRectPath (-$w * 0.37 * $scale) (-$h * 0.055 * $scale) ($w * 0.74 * $scale) ($h * 0.11 * $scale) (18 * $scale)
  $g.FillPath($strapBrush, $path)
  $pen = [System.Drawing.Pen]::new($strapHi, [single](3 * $scale))
  $g.DrawLine(
    $pen,
    [single](-$w * 0.33 * $scale),
    [single](-$h * 0.02 * $scale),
    [single]($w * 0.33 * $scale),
    [single](-$h * 0.02 * $scale)
  )
  $pen.Dispose()
  $strapBrush.Dispose()
  $path.Dispose()
  $g.Restore($state)
}

function Add-Plate($g, $w, $h, $kind, $angle, $scale) {
  $state = $g.Save()
  $g.TranslateTransform([single]($w / 2), [single]($h / 2))
  $g.RotateTransform([single]$angle)
  $shadow = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(120, 0, 0, 0))
  $silver = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    (RectF (-110 * $scale) (-42 * $scale) (220 * $scale) (84 * $scale)),
    [System.Drawing.Color]::FromArgb(255, 235, 232, 221),
    [System.Drawing.Color]::FromArgb(255, 114, 116, 112),
    28
  )
  $edge = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(220, 242, 239, 230), [single](2.2 * $scale))
  $dark = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(130, 55, 56, 54), [single](1.3 * $scale))

  if ($kind -eq 'root') {
    $path = New-RoundRectPath (-116 * $scale) (-38 * $scale) (232 * $scale) (76 * $scale) (34 * $scale)
  } elseif ($kind -eq 'guardian') {
    $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
    $path.AddPolygon(@(
      (PtF (-108 * $scale) 0),
      (PtF (-64 * $scale) (-42 * $scale)),
      (PtF (64 * $scale) (-42 * $scale)),
      (PtF (108 * $scale) 0),
      (PtF (64 * $scale) (42 * $scale)),
      (PtF (-64 * $scale) (42 * $scale))
    ))
  } else {
    $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
    $path.AddPolygon(@(
      (PtF (-112 * $scale) (-16 * $scale)),
      (PtF (-70 * $scale) (-42 * $scale)),
      (PtF (12 * $scale) (-34 * $scale)),
      (PtF (98 * $scale) (-22 * $scale)),
      (PtF (112 * $scale) (18 * $scale)),
      (PtF (42 * $scale) (44 * $scale)),
      (PtF (-74 * $scale) (36 * $scale))
    ))
  }

  $g.TranslateTransform([single](6 * $scale), [single](9 * $scale))
  $g.FillPath($shadow, $path)
  $g.TranslateTransform([single](-6 * $scale), [single](-9 * $scale))
  $g.FillPath($silver, $path)
  $g.DrawPath($edge, $path)

  if ($kind -eq 'root') {
    for ($i = -3; $i -le 3; $i++) {
      $g.DrawBezier(
        $dark,
        [single](-88 * $scale),
        [single]($i * 9 * $scale),
        [single](-30 * $scale),
        [single](($i - 2) * 17 * $scale),
        [single](22 * $scale),
        [single](($i + 2) * 15 * $scale),
        [single](88 * $scale),
        [single]($i * 7 * $scale)
      )
    }
  } elseif ($kind -eq 'guardian') {
    $g.DrawLine($dark, 0, [single](-30 * $scale), 0, [single](30 * $scale))
    $g.DrawLine($dark, [single](-34 * $scale), 0, [single](34 * $scale), 0)
    $g.DrawPolygon($dark, @(
      (PtF (-64 * $scale) 0),
      (PtF 0 (-28 * $scale)),
      (PtF (64 * $scale) 0),
      (PtF 0 (28 * $scale))
    ))
  } else {
    for ($i = 0; $i -lt 9; $i++) {
      $x = -82 * $scale + ($i * 20 * $scale)
      $g.DrawLine($dark, [single]$x, [single](-24 * $scale), [single]($x + 28 * $scale), [single](24 * $scale))
    }
  }

  $dark.Dispose()
  $edge.Dispose()
  $silver.Dispose()
  $shadow.Dispose()
  $path.Dispose()
  $g.Restore($state)
}

function Add-Arm($g, $w, $h) {
  $skin = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    (RectF 0 ($h * 0.45) $w ($h * 0.22)),
    [System.Drawing.Color]::FromArgb(255, 116, 83, 62),
    [System.Drawing.Color]::FromArgb(255, 181, 135, 96),
    0
  )
  $path = New-RoundRectPath (-$w * 0.1) ($h * 0.46) ($w * 1.2) ($h * 0.18) 52
  $g.FillPath($skin, $path)
  $skin.Dispose()
  $path.Dispose()
}

function Save-Asset($path, $w, $h, $kind, $variant, $material, $seed) {
  $rng = [System.Random]::new($seed)
  $bmp = [System.Drawing.Bitmap]::new($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  Add-Stone $g $w $h $rng

  if ($variant -eq 'on-wrist') {
    Add-Arm $g $w $h
  }

  if ($variant -eq 'detail') {
    Add-Strap $g $w $h $material 0 1.35
    Add-Plate $g $w $h $kind 0 1.65
  } elseif ($variant -eq 'back') {
    Add-Strap $g $w $h $material -8 1.05
    Add-Plate $g $w $h $kind -8 0.95
  } elseif ($variant -eq 'material') {
    Add-Strap $g $w $h $material 0 1.55
    Add-Plate $g $w $h $kind 0 0.72
  } else {
    $angle = if ($variant -eq 'on-wrist') { -6 } else { -12 }
    Add-Strap $g $w $h $material $angle 1.0
    Add-Plate $g $w $h $kind $angle 1.0
  }

  $overlay = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    (Rect 0 0 $w $h),
    [System.Drawing.Color]::FromArgb(0, 0, 0, 0),
    [System.Drawing.Color]::FromArgb(115, 0, 0, 0),
    90
  )
  $g.FillRectangle($overlay, 0, 0, $w, $h)
  $overlay.Dispose()
  $dir = Split-Path $path -Parent
  if (!(Test-Path $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
  }
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $g.Dispose()
  $bmp.Dispose()
}

function Save-Craft($path, $w, $h, $mode, $seed) {
  $rng = [System.Random]::new($seed)
  $bmp = [System.Drawing.Bitmap]::new($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  Add-Stone $g $w $h $rng

  if ($mode -eq 'workbench') {
    for ($i = 0; $i -lt 5; $i++) {
      $pen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(180, 180, 174, 156), 7)
      $x = 120 + $i * 140
      $g.DrawLine($pen, $x, [int]($h * 0.24), $x + 260, [int]($h * 0.72))
      $pen.Dispose()
    }
    Add-Plate $g $w $h 'guardian' -18 1.0
  } elseif ($mode -eq 'wrist') {
    Add-Arm $g $w $h
    Add-Strap $g $w $h 'leather' -4 1.05
    Add-Plate $g $w $h 'root' -4 0.95
  } else {
    Add-Strap $g $w $h 'rubber' 0 1.2
    Add-Plate $g $w $h 'mountain' 0 1.6
  }

  $dir = Split-Path $path -Parent
  if (!(Test-Path $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
  }
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $g.Dispose()
  $bmp.Dispose()
}

$root = (Resolve-Path 'public\assets\images').Path
Save-Asset (Join-Path $root 'hero\stone-hero.jpg') 2400 1600 'root' 'hero' 'leather' 100

$products = @(
  @{ Slug = 'pesvi'; Kind = 'root'; Material = 'leather'; Seed = 11 },
  @{ Slug = 'mcveli'; Kind = 'guardian'; Material = 'rubber'; Seed = 22 },
  @{ Slug = 'mtis-kvali'; Kind = 'mountain'; Material = 'leather'; Seed = 33 }
)
$variants = @('hero', 'on-wrist', 'detail', 'back', 'material')

foreach ($product in $products) {
  foreach ($variant in $variants) {
    Save-Asset `
      (Join-Path $root ("bracelets\{0}\{1}.jpg" -f $product.Slug, $variant)) `
      1200 `
      1600 `
      $product.Kind `
      $variant `
      $product.Material `
      ($product.Seed + $variants.IndexOf($variant))
  }
}

Save-Craft (Join-Path $root 'craft\workbench.jpg') 1600 1100 'workbench' 71
Save-Craft (Join-Path $root 'craft\silver-detail.jpg') 1400 1100 'detail' 72
Save-Craft (Join-Path $root 'craft\wrist-fitting.jpg') 1400 1100 'wrist' 73

Write-Output 'Generated image assets.'
