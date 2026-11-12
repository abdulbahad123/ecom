<#
.SYNOPSIS
  Deploy TAMSTAR storefront files directly to FTP server for https://ecom.zamzy.in/
.PARAMETER FtpUser
  The FTP username
.PARAMETER FtpPassword
  The FTP password
.PARAMETER FtpHost
  The FTP server host (default: ecom.zamzy.in)
.PARAMETER RemoteDir
  The remote target directory (default: public_html)
#>
param(
  [Parameter(Mandatory=$true)]
  [string]$FtpUser,

  [Parameter(Mandatory=$true)]
  [string]$FtpPassword,

  [string]$FtpHost = "ecom.zamzy.in",
  [string]$RemoteDir = "public_html"
)

$localRoot = Join-Path $PSScriptRoot "tamstar"
if (-not (Test-Path $localRoot)) {
  Write-Error "Local tamstar directory not found at $localRoot"
  exit 1
}

Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "TAMSTAR Storefront FTP Deployment to $FtpHost" -ForegroundColor Cyan
Write-Host "Source: $localRoot" -ForegroundColor Cyan
Write-Host "Remote Target: /$RemoteDir" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

function Make-FtpDirectory {
  param([string]$remoteUri, [System.Net.NetworkCredential]$cred)
  try {
    $req = [System.Net.FtpWebRequest]::Create($remoteUri)
    $req.Credentials = $cred
    $req.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
    $req.UsePassive = $true
    $req.KeepAlive = $false
    $resp = $req.GetResponse()
    $resp.Close()
  } catch {
    # Directory may already exist, ignore error 550
  }
}

function Upload-FtpFile {
  param([string]$localFile, [string]$remoteUri, [System.Net.NetworkCredential]$cred)
  $req = [System.Net.FtpWebRequest]::Create($remoteUri)
  $req.Credentials = $cred
  $req.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
  $req.UseBinary = $true
  $req.UsePassive = $true
  $req.KeepAlive = $false

  $fileBytes = [System.IO.File]::ReadAllBytes($localFile)
  $req.ContentLength = $fileBytes.Length
  $reqStream = $req.GetRequestStream()
  $reqStream.Write($fileBytes, 0, $fileBytes.Length)
  $reqStream.Close()
  $resp = $req.GetResponse()
  $resp.Close()
}

$cred = New-Object System.Net.NetworkCredential($FtpUser, $FtpPassword)

# Test connection
Write-Host "`nTesting FTP connection to ftp://$FtpHost/..." -ForegroundColor Yellow
try {
  $testReq = [System.Net.FtpWebRequest]::Create("ftp://$FtpHost/")
  $testReq.Credentials = $cred
  $testReq.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectory
  $testReq.UsePassive = $true
  $testReq.Timeout = 10000
  $testResp = $testReq.GetResponse()
  $testResp.Close()
  Write-Host "FTP Authentication Successful!" -ForegroundColor Green
} catch {
  Write-Error "Failed to connect/authenticate to FTP: $_"
  exit 1
}

# Ensure remote base directory exists if specified
if ($RemoteDir -and $RemoteDir -ne "" -and $RemoteDir -ne "/") {
  $baseDirUri = "ftp://$FtpHost/$RemoteDir"
  Make-FtpDirectory -remoteUri $baseDirUri -cred $cred
}

$files = Get-ChildItem -Path $localRoot -Recurse -File
$total = $files.Count
$current = 0

Write-Host "`nUploading $total files to FTP..." -ForegroundColor Yellow

foreach ($file in $files) {
  $current++
  $relPath = $file.FullName.Substring($localRoot.Length).TrimStart("\", "/")
  $relDir = [System.IO.Path]::GetDirectoryName($relPath)

  # Create directories if needed
  if ($relDir) {
    $dirParts = $relDir.Split("\/")
    $curDir = if ($RemoteDir -and $RemoteDir -ne "" -and $RemoteDir -ne "/") { $RemoteDir } else { "" }
    foreach ($part in $dirParts) {
      if ($curDir -ne "") { $curDir = "$curDir/$part" } else { $curDir = $part }
      Make-FtpDirectory -remoteUri "ftp://$FtpHost/$curDir" -cred $cred
    }
  }

  $targetUri = if ($RemoteDir -and $RemoteDir -ne "" -and $RemoteDir -ne "/") {
    "ftp://$FtpHost/$RemoteDir/" + ($relPath -replace "\\", "/")
  } else {
    "ftp://$FtpHost/" + ($relPath -replace "\\", "/")
  }

  Write-Host "[$current/$total] Uploading $relPath..." -NoNewline
  try {
    Upload-FtpFile -localFile $file.FullName -remoteUri $targetUri -cred $cred
    Write-Host " OK" -ForegroundColor Green
  } catch {
    Write-Host " FAILED: $_" -ForegroundColor Red
  }
}

Write-Host "`n=================================================" -ForegroundColor Cyan
Write-Host "Deployment Complete! Please check https://ecom.zamzy.in/" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Cyan
