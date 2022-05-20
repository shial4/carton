// swift-tools-version:5.6
import PackageDescription
let package = Package(
  name: "Milk",
  platforms: [.macOS(.v11)],
  products: [
    .executable(name: "Milk", targets: ["Milk"]),
  ],
  dependencies: [
    .package(url: "https://github.com/TokamakUI/Tokamak", branch: "main"),
  ],
  targets: [
    .executableTarget(
      name: "Milk",
      dependencies: [
        .product(name: "TokamakShim", package: "Tokamak"),
      ]
    ),
    .testTarget(
      name: "MilkTests",
      dependencies: ["Milk"]
    ),
  ]
)
