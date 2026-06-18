import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ChatBubbleLeftRight } from "@medusajs/icons"
import { Container, Heading, Table, Badge, Text, Button } from "@medusajs/ui"
import { useEffect, useState } from "react"

type Submission = {
  id: string
  type: string
  name: string | null
  company: string | null
  contact_person: string | null
  phone: string | null
  category: string | null
  message: string | null
  product: string | null
  sku: string | null
  quantity: string | null
  document_type: string | null
  files: string | null
  notes: string | null
  status: string
  created_at: string
}

const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    fetch("/store/submissions", {
      headers: {
        "x-publishable-api-key": "pk_6014714fc48f7807b4d2170add5cd45f26e9a34604f22baa3e062596ca952e97",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data.submissions || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "contact":
        return <Badge color="blue">Contact</Badge>
      case "product_quote":
        return <Badge color="green">Quote</Badge>
      case "document":
        return <Badge color="purple">Document</Badge>
      default:
        return <Badge color="grey">{type}</Badge>
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const renderFiles = (files: string | null) => {
    if (!files || files === "No files attached") return <Text size="small">—</Text>

    const fileList = files.split(", ").map((f) => f.trim())
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {fileList.map((file, i) => {
          const isUrl = file.startsWith("http")
          if (isUrl) {
            const fileName = file.split("/").pop() || `File ${i + 1}`
            const downloadUrl = file.replace(/\/files\//, "/files/") + "/download"
            return (
              <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <a
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#3b82f6", textDecoration: "underline", fontSize: "13px" }}
                >
                  View
                </a>
                <a
                  href={downloadUrl}
                  style={{ color: "#10b981", textDecoration: "underline", fontSize: "13px" }}
                >
                  Download
                </a>
                <Text size="small" style={{ color: "#6b7280" }}>{fileName}</Text>
              </div>
            )
          }
          return <Text size="small" key={i}>{file}</Text>
        })}
      </div>
    )
  }

  if (loading) {
    return (
      <Container>
        <Heading level="h1" className="mb-4">Form Submissions</Heading>
        <Text>Loading submissions...</Text>
      </Container>
    )
  }

  return (
    <Container>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <Heading level="h1">Form Submissions</Heading>
        <Badge color="grey">{submissions.length} total</Badge>
      </div>

      {submissions.length === 0 ? (
        <Text>No submissions yet.</Text>
      ) : (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Name / Company</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Details</Table.HeaderCell>
              <Table.HeaderCell>Files</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {submissions.map((sub) => (
              <Table.Row
                key={sub.id}
                onClick={() => setExpanded(expanded === sub.id ? null : sub.id)}
                style={{ cursor: "pointer" }}
              >
                <Table.Cell>
                  <Text size="small">{formatDate(sub.created_at)}</Text>
                </Table.Cell>
                <Table.Cell>{getTypeBadge(sub.type)}</Table.Cell>
                <Table.Cell>
                  <div>
                    {sub.name && <Text className="font-medium">{sub.name}</Text>}
                    {sub.contact_person && <Text className="font-medium">{sub.contact_person}</Text>}
                    {sub.company && <Text size="small" style={{ color: "#6b7280" }}>{sub.company}</Text>}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Text size="small">{sub.phone || "—"}</Text>
                </Table.Cell>
                <Table.Cell>
                  <div style={{ maxWidth: "300px" }}>
                    {sub.product && <Text size="small"><strong>Product:</strong> {sub.product}</Text>}
                    {sub.sku && <Text size="small"><strong>SKU:</strong> {sub.sku}</Text>}
                    {sub.quantity && <Text size="small"><strong>Qty:</strong> {sub.quantity}</Text>}
                    {sub.category && <Text size="small"><strong>Category:</strong> {sub.category}</Text>}
                    {sub.document_type && <Text size="small"><strong>Doc Type:</strong> {sub.document_type}</Text>}
                    {sub.message && (
                      <Text size="small" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: expanded === sub.id ? "normal" : "nowrap" }}>
                        {sub.message}
                      </Text>
                    )}
                    {sub.notes && (
                      <Text size="small" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: expanded === sub.id ? "normal" : "nowrap" }}>
                        <strong>Notes:</strong> {sub.notes}
                      </Text>
                    )}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  {renderFiles(sub.files)}
                </Table.Cell>
                <Table.Cell>
                  <Badge color={sub.status === "new" ? "orange" : "green"}>
                    {sub.status}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Submissions",
  icon: ChatBubbleLeftRight,
})

export default SubmissionsPage
