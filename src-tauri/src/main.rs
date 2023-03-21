// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use ahash::AHashMap;
use md5::{Digest, Md5};
use rayon::prelude::*;
use serde::{Deserialize, Serialize};
use std::{
    // collections::HashMap,
    fs,
    io::{self},
    time::Instant,
};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![calc_md5])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
#[derive(Debug, Serialize, Deserialize)]
struct FileInfo {
    time: u128,
    hash: String,
}

#[tauri::command]
fn calc_md5(filenames: Vec<String>) -> AHashMap<String, FileInfo> {
    let mut map = AHashMap::new();
    for file in filenames {
        let start = Instant::now();
        let mut hasher = Md5::new();
        let mut f = fs::File::open(&file).unwrap();
        io::copy(&mut f, &mut hasher).unwrap();
        let hash = hasher.finalize();
        let hex_hash = base16ct::lower::encode_string(&hash);
        let duration = start.elapsed();
        map.insert(
            file,
            FileInfo {
                time: duration.as_millis(),
                hash: hex_hash,
            },
        );
    }
    map
}
