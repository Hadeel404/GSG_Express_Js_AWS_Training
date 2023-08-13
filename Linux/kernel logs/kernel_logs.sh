#!/bin/bash

# Defining the used files as var 
current_time_format=$(date +'%Y-%m-%dT%H-%M')
hourly_log_file="kernel-logs-$current_time_format"
hourly_log_file_txt="$hourly_log_file.txt"
hourly_compressed_log_file="$hourly_log_file.tar.bz2"

# Getting the kernel logs of the last hour from the journald
journalctl --since "1 hour ago" -k > $hourly_log_file_txt

# Compressing the text file of logs
tar -cjvf $hourly_compressed_log_file $hourly_log_file_txt

# Uploading the compressed file to Dropbox
dbxcli put "$hourly_compressed_log_file" /kernel_logs/$hourly_log_file

# Cleaning up the temporary files
rm -f $hourly_log_file_txt $hourly_compressed_log_file

